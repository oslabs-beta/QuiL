import axios from 'axios';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { quilDbConnection } from '../postgres/userModels';
import { CreateNewAccountResponse, CreateNewUserObject } from '../types';
import { createAccount, getQuilUser } from './controller';
dotenv.config();

// Import github OAuth credentials from the environment
const { GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET, JWT_SECRET } =
  process.env;

/*
Uses a github oauth code to exchange for an OAuth access token. 
This allows subsequent funcs to use this OAuth code to query the
 GitHUb api on the authenticated user's behalf.
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
    console.log('access_token', accessTokenResponse.data.access_token);

    return { gitHubToken: accessTokenResponse.data.access_token };
  } catch (error) {
    console.log(error.message);
    return { gitHubToken: 'Invalid code' };
  }
}

type UserObject = {
  name: string;
  username: string;
  avatarUrl: string;
};

/*
Uses a github oauth code to exchange for an OAuth access token. 
This allows subsequent funcs to use this OAuth code to query the
 GitHUb api on the authenticated user's behalf.
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

type TokenJwt = {
  token: string;
};

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

// TODO: Edit this to return the shape that the JWT needs

export async function handleOAuth(
  code: string,
  type: string
): Promise<TokenJwt> {
  try {
    const { gitHubToken } = await getOAuthToken(code);

    if (!gitHubToken) throw new Error('Bad credentials');

    const { gitHubUserData } = await getGitHubUserData(gitHubToken);

    if (type === 'register') {
      const newUserObj = buildNewGitHubUserData(gitHubUserData);
      const createdUser = await createAccount(newUserObj);
      if (createdUser.success) {
        return generateJWT(createdUser);
      } else throw new Error('Error creating account');
    }

    if (type === 'signin') {
      const { login } = gitHubUserData;
      const user = await getQuilUser(login);
      if (user.success) {
        return generateJWT(user);
      } else throw new Error('Error creating account');
    }
  } catch (error) {
    return { token: null };
  }
}
