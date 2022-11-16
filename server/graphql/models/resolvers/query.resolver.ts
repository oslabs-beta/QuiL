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

export const Query = {
  getAllData: async (_: any, args: ArgType): Promise<QuiLData> => {
    const dataBase = new (dbInstance as any)(args.uri);
    const { nodes } = await makeNodes(dataBase);
    const queryString = await generateSchemas(dataBase);
    return {
      nodes,
      resolvers: nodes.map((node: nodeShape) =>
        makeResolverStrings(node, makeResolverFunctions(node))
      ),
      schemas: queryString,
    };
  },
};
