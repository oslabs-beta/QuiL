import * as path from 'path';
// const { loadFilesSync } = require('@graphql-tools/load-files');
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

const resolverFiles = loadFilesSync(path.join(__dirname, './models/resolvers'));
const schemaFiles = loadFilesSync(path.join(__dirname, './models/schemas'));

export const typeDefs = mergeTypeDefs(schemaFiles)
export const resolvers = mergeResolvers(resolverFiles)  
  
