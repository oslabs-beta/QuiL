"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// function to write statement for PostgresQL to grab table names/data types of tables, foreign keys, primary keys
var query = require('express').query;
var debuglog = require('util').debuglog;
var dbInstance = require('./db/dbConnection');
// parses out columns to key-value name we want
var parseColumns = function (columns) {
    return columns.map(function (e) {
        return { columnName: e.column_name, dataType: e.data_type };
    });
};
// returns pKey of a given table within a databse (so that it grabs pKeys even if not named '_id')
var parsePKey = function (queryResults, tableName) {
    var unparsedPKey;
    var pKey = '';
    for (var i = 0; i < queryResults.length; i++) {
        var el = queryResults[i];
        if (el.table_name === tableName) {
            unparsedPKey = el.pg_get_constraintdef;
        }
    }
    var inParens = false;
    for (var j = 0; j < unparsedPKey.length; j++) {
        var char = unparsedPKey[j];
        if (char === ')')
            inParens = false;
        if (inParens === true)
            pKey += char;
        if (char === '(')
            inParens = true;
    }
    return pKey;
};
// given a table, returns foreign keys for a specific table
var parseFKeys = function (queryResults, tableName) {
    var parsedFKeys = [];
    var unparsedFKeys = [];
    for (var i = 0; i < queryResults.length; i++) {
        var el = queryResults[i];
        if (el.table_name === tableName)
            unparsedFKeys.push(el);
    }
    // console.log(unparsedFKeys);
    for (var j = 0; j < unparsedFKeys.length; j++) {
        var fKeyObj = { fKey: '', refTable: '' };
        var unparsedFKey = unparsedFKeys[j].pg_get_constraintdef;
        // parse out foreign key
        var fKey = '';
        var inFirstParens = false;
        for (var k = 0; k < unparsedFKey.length; k++) {
            var char = unparsedFKey[k];
            if (char === ')') {
                inFirstParens = false;
                break;
            }
            if (inFirstParens === true)
                fKey += char;
            if (char === '(')
                inFirstParens = true;
        }
        // parse out reference table
        var keyword = 'REFERENCES ';
        var escapeChar = '(';
        var indexStartKeyword = unparsedFKey.indexOf(keyword);
        var fKeyRefUnsliced = unparsedFKey.slice(indexStartKeyword + keyword.length);
        var indexOfEscapeChar = fKeyRefUnsliced.indexOf(escapeChar);
        var fKeyRef = fKeyRefUnsliced.slice(0, indexOfEscapeChar);
        // fKeyObj[fKey] = fKeyRef;
        fKeyObj.fKey = fKey;
        fKeyObj.refTable = fKeyRef;
        parsedFKeys.push(fKeyObj);
    }
    // console.log(parsedFKeys);
    return parsedFKeys;
};
var makeNodes = function (db) { return __awaiter(void 0, void 0, void 0, function () {
    var arrOfNodes, tables, i, node, unparsedPKey, unparsedColumns, unparsedFKeys;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                arrOfNodes = [];
                if (!(db.dbType === 'PostgreSQL')) return [3 /*break*/, 7];
                return [4 /*yield*/, db.queryTables()];
            case 1:
                tables = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < tables.length)) return [3 /*break*/, 7];
                node = { name: '', primaryKey: '', columns: [], edges: [] };
                node.name = "" + tables[i].table_name;
                return [4 /*yield*/, db.queryPKey()];
            case 3:
                unparsedPKey = _a.sent();
                // console.log(unparsedPKey);
                node.primaryKey = parsePKey(unparsedPKey, node.name);
                return [4 /*yield*/, db.queryColumns(node.name)];
            case 4:
                unparsedColumns = _a.sent();
                node.columns = parseColumns(unparsedColumns);
                return [4 /*yield*/, db.queryFKeys()];
            case 5:
                unparsedFKeys = _a.sent();
                node.edges = parseFKeys(unparsedFKeys, node.name);
                arrOfNodes.push(node);
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 2];
            case 7: 
            // console.log(arrOfNodes[0]);
            // console.log(arrOfNodes[0].columns);
            // console.log(arrOfNodes[0].edges);
            // console.log(arrOfNodes);
            return [2 /*return*/, { nodes: arrOfNodes }];
        }
    });
}); };
// test instance with SWAPI DB
var sWAPI = new dbInstance('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj');
makeNodes(sWAPI);
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
module.exports = makeNodes, parsePKey;
