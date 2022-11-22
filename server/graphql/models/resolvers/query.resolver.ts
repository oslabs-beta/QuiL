import {
  ArgType,
  nodeShape,
  OAuthArgs,
  OAuthResponse,
  QuiLData,
} from '../../../types';

import { dbInstance } from '../../../db/dbConnection';
import { makeNodes } from '../../../helperFunctions';

// Import dummy data for testing
import axios from 'axios';
import { dummyResolvers, dummySchemas } from '../../../db/dummyData';
import {
  makeResolverFunctions,
  makeResolverStrings,
} from '../../../resolverGenerator';
import { generateSchemas } from '../../../schemaGenerator';

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
    const { data } = await axios.get(
      `https://github.com/login/oauth/access_token?client_id={{client_id}}&client_secret={{client_secret}}&code=f0e69302d27715c1bbc7`,
      {
        params: {
          client_id: '',
          client_secret: '',
          code: args.code,
        },
      }
    );

    return {
      token: data,
    };
  },
};
