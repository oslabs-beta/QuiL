const { createData } = require('../../../middleware/databaseHandler');

module.exports = {
  Query: {
    getAllData: (_, args, context) => createData(args.uri),
  },
};
