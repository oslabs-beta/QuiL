import { dbConstructor, schema, pSQLToGQL } from "./types";
const pluralize = require('pluralize');
const { query } = require('express');
const dbInstance = require('./db/dbConnection');
const parsePKey = require ('./helperFunctions');

const db = new dbInstance('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj');

// generates schemas per table
export const generateSchemas = async (db: dbConstructor) => {
    let tables = await db.queryTables();
    for (let i = 0; i < tables.length; i++) {
        let tableName = tables[i].table_name;
        const schema: schema = {type: tableName};
        let tableQuery = await db.queryTableLayout(tableName);
        for (let j = 0; j < tableQuery.length; j++) {
            let column = tableQuery[j].column_name;
            let dataType = convertToGQL(tableQuery[j].data_type, tableQuery[j].is_nullable);
            schema[column] = dataType;
        }
        // primary keys have to become "ID!" in GQL
        let pKey = await parsePKey(tableName);
        console.log(pKey);
        schema[pKey] = 'ID!';
        // console.log(schema);
    }
};

const pSQLToGQL: pSQLToGQL = {
    'character varying': 'String',
    integer: 'Int',
    bigint: 'Int',
};

// function to convert PostgreSQL data types into GraphQL data types
// TODO: primary keys become ID!
// const convertToGQL = (dataType: string, nullable: string): string => {
//     dataType = pSQLToGQL[dataType];
//     if (nullable === 'NO') dataType += '!';
//     return dataType;
// };

// console.log(pluralize.singular('people'))

// TEST:
// generateSchemas(db);

// const testQueries = async () => {
//     let queryResults = await db.queryTableLayout('people');
//     console.log(queryResults)
//     console.log(queryResults[1]);
//     console.log(queryResults[0].column_name)
// }
// testQueries();

// console.log(convertToGQL('varchar', 'NO'));
// console.log(convertToGQL('integer', 'YES'));
/* 
GRAPHQL Types:
Scalar: Int, Float, String, Boolean, ID (serialized ID)
not NUll = ! (required)
[String!] --> expect an array of strings
*/

// how to find join tables 
// write resolve to have data of an array of all people in that film
// get data of join table for a selected record

/*
For example when querying people
you need to write in the resolver the logic to return
an array of films each person is in
*/

/*
type Film {
    _id: ID!
    title: String!
    episode_id: Int!
    opening_crawl: String!
    director: String!
    producer: String!
    release_date: String!
    people: [Person]
    planets: [Planet]
    species: [Species]
    vessels: [Vessel]
  }
*/
