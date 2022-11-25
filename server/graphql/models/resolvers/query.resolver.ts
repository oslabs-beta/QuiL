import {
  ArgType,
  nodeShape,
  QuiLData,
  NewUser,
  SaveProject,
  CreateAccountRes,
  SavedProjectRes,
  GetUserProjectRes,
  GetUser,
  GetUserRes,
} from '../../../types';

import { makeNodes } from '../../../helperFunctions';
import { dbInstance } from '../../../db/dbConnection';

//imported middleware/controller by andres and the type NewUser
import {
  createAccount,
  getUserProject,
  saveProject,
  validateUser,
} from '../../../middleware/controller';

// Import dummy data for testing
import { dummyResolvers, dummySchemas } from '../../../db/dummyData';
import {
  makeResolverFunctions,
  makeResolverStrings,
} from '../../../resolverGenerator';
import { generateSchemas } from '../../../schemaGenerator';
import { stringify } from 'querystring';
import { extendSchemaImpl } from 'graphql/utilities/extendSchema';

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
  getUserProjects: async (_: any, arg: Number): Promise<GetUserProjectRes> => {
    return await getUserProject(arg);
  },
};

export const Mutation = {
  newUser: async (_: any, obj: NewUser): Promise<CreateAccountRes> => {
    return await createAccount(obj);
  },
  saveData: async (_: any, obj: SaveProject): Promise<SavedProjectRes> => {
    return await saveProject(obj);
  },
  valUser: async (_: any, obj: GetUser): Promise<GetUserRes> => {
    return await validateUser(obj);
  },
};
