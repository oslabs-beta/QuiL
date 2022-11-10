const dbInstance = require('../db/dbConnection');
const makeNodes = require('../helperFunctions');

// Import dummy data for testing
const { dummyResolvers, dummySchemas } = require('../db/dummyData');

module.exports = {
  createData: async uri => {
    const { nodes } = await makeNodes(new dbInstance(uri));
    return {
      nodes,
      resolvers: dummyResolvers,
      schemas: dummySchemas,
    };
  },
};
