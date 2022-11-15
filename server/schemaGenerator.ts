import { dbConstructor, schema, pSQLToGQL } from "./types";
// const pluralize = require('pluralize');
// const { query } = require('express');
// const dbInstance = require('./db/dbConnection');
// const parsePKey = require ('./helperFunctions');

// import * as pluralize from "pluralize";
const pluralize = require('pluralize');
import { query } from "express";
import { dbInstance } from './db/dbConnection';
import { parseColumns, parsePKey, parseFKeys, makeNodes } from './helperFunctions'

const db = new (dbInstance as any)('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj');

// generates schemas given a database
export const generateSchemas = async (db: dbConstructor): Promise <schema[]> => {
    let tables = await db.queryTables();
    const schemas: schema[] = [];
    for (let i = 0; i < tables.length; i++) {
        let tableName = tables[i].table_name;
        const schema: schema = {table_name: tableName};
        let tableQuery = await db.queryTableLayout(tableName);
        for (let j = 0; j < tableQuery.length; j++) {
            let column = tableQuery[j].column_name;
            let dataType = convertToGQL(tableQuery[j].data_type, tableQuery[j].is_nullable);
            schema[column] = dataType;
        }
        // primary keys have to become "ID!" in GQL
        let unparsedPKey = await db.queryPKey();
        let pKey = parsePKey(unparsedPKey, tableName);
        schema[pKey] = 'ID!';
        schemas.push(schema);
    }
    // iterate again to create table: instance ex: People: [Person] key-value in planets schema
    for (let j = 0; j < schemas.length; j++) {
        let schema = schemas[j];
        let isIntTable = await isIntersectionTable(db, schema.table_name)
        let edges;
            let unparsedFKeys = await db.queryFKeys();
            edges = parseFKeys(unparsedFKeys, schema.table_name);
            for (let k = 0; k < edges.length; k++) {
                for (let l = 0; l < schemas.length; l++) {
                    if (edges[k].refTable === schemas[l].table_name) {
                        // if a table is not an intersection table, then find its refTables and add key-value pair: tableName: singularizedTableName
                        if (isIntTable === false) schemas[l][schema.table_name] = formatStr(schema.table_name); 
                        else {
                            for (let m = 0; m < edges.length; m++) {
                                schemas[l][edges[m].refTable] = formatStr(edges[m].refTable);
                        }
                    }
                }
            }
        }
    }
    for (let n = 0; n < schemas.length; n++) {
        let tableName = tables[n].table_name;
        delete schemas[n][tableName];
    }
    // per table, loop through FKeys
    for (let o = 0; o < schemas.length; o++) {
        let unparsedFKeys = await db.queryFKeys();
        let edges = parseFKeys(unparsedFKeys, schemas[o].table_name)
        for (let p = 0; p < edges.length; p++) {
            delete schemas[o][edges[p].fKey];
            schemas[o][edges[p].refTable] = formatStr(edges[p].refTable);
        }
    }
    // delete all intersection tables
    for (let q = 0; q < schemas.length; q++) {
        let isIntTable = await isIntersectionTable(db, schemas[q].table_name)
        if (isIntTable === true) delete schemas[q];
    }
    console.log(schemas);
    return schemas;
};

// TODO: function to stringify and format schemas
const formatSchemas = async (schemasArray: schema[]): Promise<string> => {
    let strSchemas = '';
    for (let i = 0; i < schemasArray.length; i++) {
        strSchemas += JSON.stringify(schemasArray[i]);
    } 
    return strSchemas;
}

// function to identify whether or not a table is an intersection table (table with all foreign keys)
const isIntersectionTable = async (db: dbConstructor, tableName: string): Promise <boolean> => {
    const unparsedColumns = await db.queryColumns(tableName);
    let numColumns = unparsedColumns.length;
    let unparsedFKeys = await db.queryFKeys();
    let numFKeys = parseFKeys(unparsedFKeys, tableName).length
    // need to subtract 1 for primary key
    if (numColumns - 1 === numFKeys) return true;
    return false;
}

// function to singularize words, capitalize the first letter, and then return as '[formattedStr]' (ex: People --> '[Person]')
const formatStr = (str: string) => {
    // singularize word
    let singular = pluralize.singular(str);
    // capitalize first letter and return in string with '[' in front and ']' in back
    return `[${singular[0].toUpperCase() + singular.slice(1)}]`;
}

// function to convert PostgreSQL data types into GraphQL data types
const convertToGQL = (dataType: string, nullable: string): string => {
    dataType = pSQLToGQL[dataType];
    if (nullable === 'NO') dataType += '!';
    return dataType;
};

// object to convert postgreSQL datatypes into GraphQL datatypes
const pSQLToGQL: pSQLToGQL = {
    'character varying': 'String',
    integer: 'Int',
    bigint: 'Int',
    date: 'String'
};

/*
Loop through foreign keys query, specifically the pg_get_constraintdef strings
    save all pg_get_constraintdef strings in an array
loop through tableNames and check if any of the array of strings includes that tableName
    if so, remember the table name associated with pg_get_constraintdef string
    grab any OTHER foreign keys in that table, and create a key-value pair: tableName: singularized version of tableName
*/

// Tests:

// const testIntTable = async (db: any, tableName: any): Promise<any> => {
//     let x = await isIntersectionTable(db, tableName);
//     console.log(x);
//     return x;
// }

// let tableName1 = 'planets_in_films';
// let tableName2 = 'planets';
// testIntTable(db, tableName1);
// testIntTable(db, tableName2);

// const test = async (db: any) => {
//     // let check = await makeNodes(db);
//     isIntersectionTable("planets_in_films");
//     isIntersectionTable("planets");
// }

generateSchemas(db);
