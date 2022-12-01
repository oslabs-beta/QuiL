import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  CreateNewAccountResponse,
  CreateNewUserObject,
  TokenJwt,
} from '../types';

import { userController } from './userController';

/*
This code is responsible for handling both login & register requests through OAuth
To understand the OAuth flow start at the function handleOAuth() at the bottom of this file
*/

// Import github OAuth credentials from the environment variables
const { GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET, JWT_SECRET } =
  process.env;

/*
Uses a github oauth code to exchange for an OAuth access token. 
This allows subsequent funcs to use this OAuth token to query the
 GitHub api on the authenticated user's behalf.
*/
export async function getOAuthToken(
  code: string
): Promise<{ gitHubToken: string }> {
  try {
    const gitHubOAuthAccessTokenUrl =
      'https://github.com/login/oauth/access_token';

    const params = {
      client_id: GITHUB_OAUTH_CLIENT_ID,
      client_secret: GITHUB_OAUTH_CLIENT_SECRET,
      code: code,
    };

    const headers = {
      Accept: 'application/json',
    };

    const accessTokenResponse = await axios.post(
      gitHubOAuthAccessTokenUrl,
      {},
      { params, headers }
    );

    return { gitHubToken: accessTokenResponse.data.access_token };
  } catch (error) {
    console.log(error.message);
    return { gitHubToken: 'Invalid code' };
  }
}

/*
Uses the OAuth access token provided by getOAuthToken() to query the GitHub user 
endpoint and retrieve the authenticated user's data. Returns all the data github returns
*/
export async function getGitHubUserData(oauthAccessToken: string) {
  try {
    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${oauthAccessToken}`,
        Accept: 'application/json',
      },
    });
    return { gitHubUserData: data };
  } catch (error) {
    console.log(error.message);
  }
}

/*
Accepts the entire user object returned by getGitHubUserData() and constructs an object that is required to 
create a new QuiL user
*/
export function buildNewGitHubUserData(gitHubUserData: {
  login: string;
  avatar_url: string;
  name: string;
}): CreateNewUserObject {
  return {
    oauthUser: true,
    name: gitHubUserData.name,
    username: gitHubUserData.login,
    avatarUrl: gitHubUserData.avatar_url,
  };
}

/*
Accepts a QuiL user object and encodes the user data into a JSON webtoken 
*/
export function generateJWT(userObject: CreateNewAccountResponse): TokenJwt {
  const token = jwt.sign(
    {
      username: userObject.username,
      userId: userObject.userId,
      name: userObject.name,
      avatarUrl: userObject.avatarUrl,
    },
    JWT_SECRET,
    {
      expiresIn: 3_600_000,
    }
  );

  return {
    token,
  };
}

/*
Main fucntion for handling OAuth login & register. Based on the 'type' parameter, this func will either 
create a new user in QuiL's database using the Oauth information or will validate an exisiting user
that is attempting to sign in via OAuth
*/
export async function handleOAuth(
  code: string,
  type: string
): Promise<TokenJwt> {
  try {
    const { gitHubToken } = await getOAuthToken(code);

    if (!gitHubToken) throw new Error('Bad credentials');

    const { gitHubUserData } = await getGitHubUserData(gitHubToken);

    if (type === 'register') {
      const exisitingUser = await userController.getQuilUser(
        gitHubUserData.login
      );

      if (exisitingUser) {
        return generateJWT(exisitingUser);
      } else {
        const newUserObj = buildNewGitHubUserData(gitHubUserData);
        const createdUser = await userController.createAccount(newUserObj);
        if (createdUser.success) {
          return generateJWT(createdUser);
        } else throw new Error('Error creating account');
      }
    }

    if (type === 'signin') {
      const { login } = gitHubUserData;
      const user = await userController.getQuilUser(login);
      if (user.success) {
        return generateJWT(user);
      } else throw new Error('Error fetching account');
    }
  } catch (error) {
    return { token: null };
  }
}
