import {
  ArgType,
  OAuthArgs,
  OAuthResponse,
  QuiLData,
  CreateNewUserObject,
  SaveProject,
  CreateNewAccountResponse,
  SavedProjectRes,
  GetUserProjectRes,
  GetUser,
  GetUserRes,
} from '../../../types';

import { dbInstance } from '../../../db/dbConnection';
import { makeNodes } from '../../../helperFunctions';

//imported middleware/controller by andres and the type NewUser
import {
  createAccount,
  getUserProject,
  saveProject,
  validateUser,
} from '../../../middleware/controller';

import {
  makeResolverFunctions,
  makeResolverStrings,
} from '../../../resolverGenerator';
import { generateSchemas } from '../../../schemaGenerator';

import { handleOAuth } from '../../../middleware/auth';

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
  newUser: async (
    _: any,
    obj: CreateNewUserObject
  ): Promise<CreateNewAccountResponse> => {
    return await createAccount(obj);
  },
  saveData: async (_: any, obj: SaveProject): Promise<SavedProjectRes> => {
    return await saveProject(obj);
  },
  valUser: async (_: any, obj: GetUser): Promise<GetUserRes> => {
    return await validateUser(obj);
  },
  postOAuth: async (_: any, args: OAuthArgs): Promise<OAuthResponse> => {
    try {
      const { token } = await handleOAuth(args.code, args.oauthType);
      return { token };
    } catch (error) {
      console.log(error.message);
    }
  },
};
