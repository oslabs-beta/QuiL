import { ArgType, nodeShape, QuiLData } from '../../../types';

import { makeNodes } from '../../../helperFunctions';
import { dbInstance } from '../../../db/dbConnection';

// Import dummy data for testing
import { dummyResolvers, dummySchemas } from '../../../db/dummyData';
import {
  makeResolverFunctions,
  makeResolverStrings,
} from '../../../resolverGenerator';

export const Query = {
  getAllData: async (_: any, args: ArgType): Promise<QuiLData> => {
    const { nodes } = await makeNodes(new (dbInstance as any)(args.uri));
    return {
      nodes,
      resolvers: nodes.map((node: nodeShape) =>
        makeResolverStrings(node, makeResolverFunctions(node))
      ),
      schemas: dummySchemas,
    };
  },
};
