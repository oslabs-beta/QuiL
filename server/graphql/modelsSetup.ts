import * as path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const resolverFiles = loadFilesSync(path.join(__dirname, './models/resolvers'));
const schemaFiles = loadFilesSync(path.join(__dirname, './models/schemas'));

/* 
After typescript migration loadFileSync created an array of objects instead an array of one string. 
mergeTypeDef seems to only work with an array consiting of one string
The following reduces all the strings in the array to one to satisfy that requirement
TODO: Fix this so that mergeTypeDefs will work without manually combining the strings
*/
export const typeDefs = mergeTypeDefs(
  schemaFiles.reduce((a, c) => {
    for (const key in c) {
      a = a + c[key];
    }
    return a;
  }, '')
);
export const resolvers = mergeResolvers(resolverFiles);
