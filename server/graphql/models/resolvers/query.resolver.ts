const { createData } = require('../../../middleware/databaseHandler');

type ArgType = {
  uri: string
}

export const Query = {
  getAllData: (_: any, args: ArgType) => createData(args.uri),
};
