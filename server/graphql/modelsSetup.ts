import * as path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const resolverFiles = loadFilesSync(path.join(__dirname, './models/resolvers'));
const schemaFiles = loadFilesSync(path.join(__dirname, './models/schemas'));

/*
This file combines ALL type definitions inside ./models/schemas AND all resolver definitions
inside ./models/resolvers and exports a single instance of all of them. 
This enables server.js to have streamlined import statements as opposed to individually importing all definitions.
*/

export const typeDefs = mergeTypeDefs(
  /* 
  After typescript migration loadFileSync created an array of objects instead an array of one string. 
  mergeTypeDef seems to only work with an array consisting of one string.
  The following reduces all the strings in the array to one string to satisfy that requirement.
  TODO: Fix this so that mergeTypeDefs will work without manually reducing the strings
  */
  schemaFiles.reduce((a, c) => {
    for (const key in c) {
      a = a + c[key];
    }
    return a;
  }, '')
);

export const resolvers = mergeResolvers(resolverFiles);
