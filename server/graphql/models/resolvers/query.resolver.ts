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
import {
  makeResolverFunctions,
  makeResolverStrings,
} from '../../../resolverGenerator';
import { generateSchemas } from '../../../schemaGenerator';
dotenv.config();
const { GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET } = process.env;

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

      console.log(data);

      const userEmailResponse = await axios.get(
        'https://api.github.com/user/emails',
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            Accept: 'application/json',
          },
        }
      );

      const userEmailObj = userEmailResponse.data.find(
        (e: any) => e.primary === 'true'
      );

      console.log(userEmailObj);

      return {
        token: 'data.access_token',
      };
    } catch (error) {
      console.log('an error');
    }
  },
};
