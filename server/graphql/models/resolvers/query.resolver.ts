import { QuiLData } from "../../../types";

import { makeNodes } from "../../../helperFunctions";
import { dbInstance } from "../../../db/dbConnection";

// Import dummy data for testing
import { dummyResolvers, dummySchemas } from '../../../db/dummyData';


interface ArgType {
  uri: String
}

export const Query = {
  getAllData: async (_: any, args: ArgType): Promise<QuiLData> => {
    const { nodes } = await makeNodes(new (dbInstance as any)(args.uri));

    return {
      nodes,
      resolvers: dummyResolvers,
      schemas: dummySchemas,
    }
  }
};
