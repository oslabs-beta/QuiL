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
var pluralize = require('pluralize');
var query = require('express').query;
var dbInstance = require('./db/dbConnection');
var parsePKey = require('./helperFunctions');
var db = new dbInstance('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj');
// generates schemas per table
exports.generateSchemas = function (db) { return __awaiter(void 0, void 0, void 0, function () {
    var tables, i, tableName, schema, tableQuery, j, column, dataType, pKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.queryTables()];
            case 1:
                tables = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < tables.length)) return [3 /*break*/, 6];
                tableName = tables[i].table_name;
                schema = { type: tableName };
                return [4 /*yield*/, db.queryTableLayout(tableName)];
            case 3:
                tableQuery = _a.sent();
                for (j = 0; j < tableQuery.length; j++) {
                    column = tableQuery[j].column_name;
                    dataType = convertToGQL(tableQuery[j].data_type, tableQuery[j].is_nullable);
                    schema[column] = dataType;
                }
                return [4 /*yield*/, parsePKey(tableName)];
            case 4:
                pKey = _a.sent();
                console.log(pKey);
                schema[pKey] = 'ID!';
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/];
        }
    });
}); };
var pSQLToGQL = {
    'character varying': 'String',
    integer: 'Int',
    bigint: 'Int'
};
// function to convert PostgreSQL data types into GraphQL data types
// TODO: primary keys become ID!
var convertToGQL = function (dataType, nullable) {
    dataType = pSQLToGQL[dataType];
    if (nullable === 'NO')
        dataType += '!';
    return dataType;
};
// console.log(pluralize.singular('people'))
// TEST:
exports.generateSchemas(db);
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
