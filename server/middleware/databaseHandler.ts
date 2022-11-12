import { QuiLData } from "../types";

import { makeNodes } from "../helperFunctions";
import { dbInstance } from "../db/dbConnection";

// Import dummy data for testing
const { dummyResolvers, dummySchemas } = require('../db/dummyData');

module.exports = {
  createData: async (uri: string): Promise<QuiLData> => {
    const { nodes } = await makeNodes(new (dbInstance as any)(uri));
    return {
      nodes,
      resolvers: dummyResolvers,
      schemas: dummySchemas,
    };
  },
};
