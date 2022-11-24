import {
  ArgType,
  nodeShape,
  OAuthArgs,
  OAuthResponse,
  QuiLData,
} from '../../../types';

import { dbInstance } from '../../../db/dbConnection';
import { makeNodes } from '../../../helperFunctions';

// Import dummy data for t
import axios from 'axios';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {
  makeResolverFunctions,
  makeResolverStrings,
} from '../../../resolverGenerator';
import { generateSchemas } from '../../../schemaGenerator';
const { sign, verify } = jwt;
dotenv.config();
const { GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET, JWT_SECRET } =
  process.env;

export const Query = {
  getAllData: async (_: any, args: ArgType): Promise<QuiLData> => {
    const dataBase = new (dbInstance as any)(args.uri);
    const { nodes } = await makeNodes(dataBase);
    const queryString = await generateSchemas(dataBase);
    return {
      nodes,
      resolvers: nodes.reduce((resolvers, node) => {
        if (!node.isIntersectionTable)
          resolvers.push(
            makeResolverStrings(node, makeResolverFunctions(node))
          );
        return resolvers;
      }, []),
      schemas: queryString,
    };
  },
};

export const Mutation = {
  handleOAuth: async (_: any, args: OAuthArgs): Promise<OAuthResponse> => {
    try {
      let { data } = await axios.post(
        `https://github.com/login/oauth/access_token`,
        {},
        {
          params: {
            client_id: GITHUB_OAUTH_CLIENT_ID,
            client_secret: GITHUB_OAUTH_CLIENT_SECRET,
            code: args.code,
          },
          headers: {
            Accept: 'application/json',
          },
        }
      );

      const gitHubUserResponse = await axios.get(
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            Accept: 'application/json',
          },
        }
      );

      // login
      // avatar_url
      // Name
      const { login, avatar_url, name } = gitHubUserResponse.data;
      let { email } = gitHubUserResponse.data;

      if (!email) {
        const userEmailResponse = await axios.get(
          'https://api.github.com/user/emails',
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
              Accept: 'application/json',
            },
          }
        );

        const primaryEmailObject = userEmailResponse.data.find(
          (e: any) => e.primary === true
        );
        email = primaryEmailObject.email;
      }

      const token = sign(
        {
          name,
          login,
        },
        JWT_SECRET,
        {
          expiresIn: 3_600_000,
        }
      );
      return {
        token,
      };
    } catch (error) {
      console.log(error.message);
    }
  },
};
