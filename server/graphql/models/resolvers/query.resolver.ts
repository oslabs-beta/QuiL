// TypeScript Definitions
import {
  ArgType,
  OAuthArgs,
  QuiLData,
  CreateNewUserObject,
  SaveProject,
  SavedProjectRes,
  GetUserProjectRes,
  GetUser,
  JWTResponse,
} from '../../../types';

import { dbInstance } from '../../../db/dbConnection';
import { makeNodes } from '../../../helperFunctions';

// Import the userController
import { userController } from '../../../middleware/userController';

// TODO: Refactor this to one object
import {
  makeResolverFunctions,
  makeResolverStrings,
} from '../../../resolverGenerator';

// TODO: refactor this to one object
import { generateSchemas } from '../../../schemaGenerator';

import { generateJWT, handleOAuth } from '../../../middleware/auth';

//Here we define our main GQL resolver definitions.
export const Query = {
  /*
  Returns all of the data required by the frontend to display in the display container, this includes
  the nodes, resolvers, and schemas
  */
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
  // Returns all of the user's projects with a user id
  // TODO: Fix the arg type. The arg will be arg.id
  getUserProjects: async (_: any, arg: Number): Promise<GetUserProjectRes> => {
    return await userController.getUserProject(arg);
  },
  testResolver: (): {} => {
    return {
      test: 'hii',
    };
  },
};

// Define all of our mutations for the GQL backend
export const Mutation = {
  // Signin handles normal non-oauth signin if the signin is successfull a JWT is returned else token is null
  signin: async (
    _: any,
    arg: GetUser
  ): Promise<JWTResponse | { error: string }> => {
    const user = await userController.validateUser({
      username: arg.username,
      password: arg.password,
    });

    if (user.success) {
      return generateJWT(user);
    } else {
      return {
        token: null,
      };
    }
  },

  // Handles regular non-oauth user sighnup
  newUser: async (_: any, obj: CreateNewUserObject): Promise<JWTResponse> => {
    return await generateJWT(await userController.createAccount(obj));
  },
  // Saves a project to a database
  saveData: async (_: any, obj: SaveProject): Promise<SavedProjectRes> => {
    return await userController.saveProject(obj);
  },
  // Handles both login and register GitHub OAuth Requests
  postOAuth: async (_: any, args: OAuthArgs): Promise<JWTResponse> => {
    try {
      const { token } = await handleOAuth(args.code, args.oauthType);
      return { token };
    } catch (error) {
      console.log(error.message);
    }
  },
};
