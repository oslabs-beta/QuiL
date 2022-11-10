// function to write statement for PostgresQL to grab table names/data types of tables, foreign keys, primary keys
const { query } = require('express');
const { debuglog } = require('util');
const dbInstance = require('./db/dbConnection');

// test Quitr instance:
// const db = new dbInstance('postgres://nsjouiot:4nVVHLiARTADoIiwArtQLG-HfkhQR03k@peanut.db.elephantsql.com/nsjouiot')

// inputting a database URI will grab all table names
// parseTables = async () => {
//     try {
//         console.log(queryResults)
//         console.log(tables);
//         return tables;
//     } catch (err) {
//         return {
//             log: `helperFunctions.js: ERROR: ${err}`,
//         }
//     }
// };

// parses out columns to key-value name we want
parseColumns =  (columns) => {
    const parsedColumns = columns.map(e => {
        return {columnName: e.column_name, dataType: e.data_type}
    });
    // console.log(parsedColumns);
    return parsedColumns;
};

// returns pKey of a given table within a databse (so that it grabs pKeys even if not named '_id')
parsePKey = (queryResults, tableName) => {
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
parseFKeys = (queryResults, tableName) => {
    const parsedFKeys = [];
    const unparsedFKeys = [];
    for (let i = 0; i < queryResults.length; i++) {
        let el = queryResults[i];
        if (el.table_name === tableName) unparsedFKeys.push(el);
    }
    // console.log(unparsedFKeys);
    for (let j = 0; j < unparsedFKeys.length; j++) {
        const fKeyObj = {};
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

makeNodes = async (db) => {
    const arrOfNodes = [];
    if (db.dbType === 'PostgreSQL') {
        let tables = await db.queryTables();
        for (let i = 0; i < tables.length; i++) {
            const node = {name: `${tables[i].table_name}`};
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
    console.log(arrOfNodes);
    console.log(arrOfNodes[2].columns);
    console.log(arrOfNodes[2].edges);
    return { nodes: arrOfNodes };
};

// test instance with SWAPI DB
const sWAPI = new dbInstance('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj');
makeNodes(sWAPI);

// const testQueries = async () => {
//     // let queryResults = await sWAPI.queryTables();
//     // console.log(queryResults);
//     queryResults = await sWAPI.queryPKey();
//     // console.log(queryResults);
//     console.log(parsePKey(queryResults, 'people'))
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


module.exports = makeNodes;
