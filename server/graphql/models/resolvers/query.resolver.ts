import { ArgType, nodeShape, QuiLData } from '../../../types';

import { makeNodes } from '../../../helperFunctions';
import { dbInstance } from '../../../db/dbConnection';

// Import dummy data for testing
import { dummyResolvers, dummySchemas } from '../../../db/dummyData';
import {
  makeResolverFunctions,
  makeResolverStrings,
} from '../../../resolverGenerator';
import { generateSchemas } from '../../../schemaGenerator';
import { stringify } from 'querystring';

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

export const userCreateQuery = {
  Query: {
    newUser(_: any, obj: newUser) {
      return obj; // returns an obj that contains em usr pw
    },
  },
};
type newUser = {
  email: String;
  username: String;
  password: String;
};

const fakeUser = {
  email: 'andres@quil.com',
  username: 'QuiL',
  password: 'QL4u',
};

// resolvers: nodes.map((node: nodeShape) =>
// makeResolverStrings(node, makeResolverFunctions(node))
// ),
