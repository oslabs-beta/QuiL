import * as path from 'path';
// const { loadFilesSync } = require('@graphql-tools/load-files');
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

const resolverFiles = loadFilesSync(path.join(__dirname, './models/resolvers'));
const schemaFiles = loadFilesSync(path.join(__dirname, './models/schemas'));

// After typescript migration loadFileSynce created an array of objects instead an array of one string. 
// This reduces the array of objects to one combined string.
export const typeDefs = mergeTypeDefs(schemaFiles.reduce((a, c) => {
    for (const key in c) {
         a = a + c[key]
    }
    return a
}, '' ))
export const resolvers = mergeResolvers(resolverFiles)  

// andres' test resolver    
