const { createData } = require('../../../middleware/databaseHandler');

module.exports = {
  Query: {
    getAllData: (_, args) => createData(args.uri),
  },
};
