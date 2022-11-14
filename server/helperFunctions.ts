import { dbConstructor, unparsedColumnShape, parsedColumnShape, unparsedKeys, parsedFKeys, nodeShape, objectOfArrOfNodes} from "./types";
// function to write statement for PostgresQL to grab table names/data types of tables, foreign keys, primary keys
const { query } = require('express');
const { debuglog } = require('util');
const dbInstance = require('./db/dbConnection');

// parses out columns to key-value name we want
const parseColumns = (columns: unparsedColumnShape[]): parsedColumnShape[] => {
    return columns.map((e: unparsedColumnShape): parsedColumnShape => {
        return {columnName: e.column_name, dataType: e.data_type}
    });
};

// returns pKey of a given table within a databse (so that it grabs pKeys even if not named '_id')
const parsePKey = (queryResults: unparsedKeys[], tableName: string): string => {
    let unparsedPKey;
    let pKey = '';
    for (let i = 0; i < queryResults.length; i++) {
        let el = queryResults[i];
        if (el.table_name === tableName) {
            unparsedPKey = el.pg_get_constraintdef;
        }
    }
    let inParens = false;
    for (let j = 0; j < unparsedPKey.length; j++) {
        let char = unparsedPKey[j];
        if (char === ')') inParens = false;
        if (inParens === true) pKey += char;
        if (char === '(') inParens = true;
    }
    return pKey;
};

// given a table, returns foreign keys for a specific table
const parseFKeys = (queryResults: unparsedKeys[], tableName: string): parsedFKeys[] => {
    const parsedFKeys = [];
    const unparsedFKeys = [];
    for (let i = 0; i < queryResults.length; i++) {
        let el = queryResults[i];
        if (el.table_name === tableName) unparsedFKeys.push(el);
    }
    // console.log(unparsedFKeys);
    for (let j = 0; j < unparsedFKeys.length; j++) {
        const fKeyObj: parsedFKeys = {fKey: '', refTable: ''};
        let unparsedFKey = unparsedFKeys[j].pg_get_constraintdef;
        // parse out foreign key
        let fKey = '';
        let inFirstParens = false;
        for (let k = 0; k < unparsedFKey.length; k++) {
            let char = unparsedFKey[k];
            if (char ===')') {
                inFirstParens = false;
                break;
            }
            if (inFirstParens === true) fKey += char;
            if (char === '(') inFirstParens = true;
        }
        // parse out reference table
        let keyword = 'REFERENCES '
        let escapeChar = '('
        let indexStartKeyword = unparsedFKey.indexOf(keyword);
        let fKeyRefUnsliced = unparsedFKey.slice(indexStartKeyword + keyword.length);
        let indexOfEscapeChar = fKeyRefUnsliced.indexOf(escapeChar);
        let fKeyRef = fKeyRefUnsliced.slice(0, indexOfEscapeChar);
        // fKeyObj[fKey] = fKeyRef;
        fKeyObj.fKey = fKey;
        fKeyObj.refTable = fKeyRef;
        parsedFKeys.push(fKeyObj);
        }
    // console.log(parsedFKeys);
    return parsedFKeys;
};

const makeNodes = async (db: dbConstructor): Promise< objectOfArrOfNodes > => {
    const arrOfNodes = [];
    if (db.dbType === 'PostgreSQL') {
        let tables = await db.queryTables();
        for (let i = 0; i < tables.length; i++) {
            const node: nodeShape = {name: '', primaryKey: '', columns: [], edges: []}
            node.name = `${tables[i].table_name}`;
            let unparsedPKey = await db.queryPKey();
            // console.log(unparsedPKey);
            node.primaryKey = parsePKey(unparsedPKey, node.name);
            let unparsedColumns = await db.queryColumns(node.name);
            node.columns = parseColumns(unparsedColumns);
            let unparsedFKeys = await db.queryFKeys();
            node.edges = parseFKeys(unparsedFKeys, node.name);
            arrOfNodes.push(node);
        }
    }
    // console.log(arrOfNodes);
    // console.log(arrOfNodes[0]);
    // console.log(arrOfNodes[0].columns);
    // console.log(arrOfNodes[0].edges);
    // console.log(arrOfNodes);
    return { nodes: arrOfNodes };
};

// test instance with SWAPI DB
// const sWAPI = new dbInstance('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj');
// makeNodes(sWAPI);

// const testQueries = async () => {
//     // let queryResults = await sWAPI.queryTables();
//     // console.log(queryResults);
//     queryResults = await sWAPI.queryTables();
//     //queryResults = await sWAPI.queryPKey();
//     // console.log(queryResults);
//     // console.log(parsePKey(queryResults, 'people'))
//     console.log(queryResults)
// }
// testQueries();

// const testQueryFKeys = async () => {
//     let queryResults = await sWAPI.queryFKeys();
//     // console.log('queryResults ')
//     // console.log(queryResults)
//     return parseFKeys(queryResults, 'people');
// }
// console.log(testQueryFKeys());

// const testQueryColumns = async () => {
//     let queryResults = await sWAPI.queryColumns('planets');
//     return parseColumns(queryResults)
// }
// console.log(testQueryColumns())


export {makeNodes}
