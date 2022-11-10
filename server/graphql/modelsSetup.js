const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const resolverFiles = loadFilesSync(path.join(__dirname, './models/resolvers'));
const schemaFiles = loadFilesSync(path.join(__dirname, './models/schemas'));

module.exports = {
  typeDefs: mergeTypeDefs(schemaFiles),
  resolvers: mergeResolvers(resolverFiles),
};
