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
require('dotenv').config();
var Pool = require('pg').Pool;
// const { stringify } = require('querystring');
// const { GlobalServerError, dbConstructor } = require('../types');
/*
create a func that accepts URI input and exports/returns query obj that's being exported (line 21), then export said func
since return value is query obj, we can import it into helperFuncs
*/
function dbInstance(inputURI) {
    var _this = this;
    if (inputURI.includes('postgres'))
        this.dbType = 'PostgreSQL';
    this.pool = new Pool({ connectionString: inputURI });
    this.query = function (text, params, callback) {
        // console.log('executed query', text);
        return _this.pool.query(text, params, callback);
    };
}
;
// Given a database, return all table names in an array
dbInstance.prototype.queryTables = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tablesQuery, rows, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!(this.dbType === 'PostgreSQL')) return [3 /*break*/, 2];
                    tablesQuery = "\n      SELECT table_name\n      FROM information_schema.tables\n      WHERE table_schema='public'\n      AND table_type='BASE TABLE';";
                    return [4 /*yield*/, this.query(tablesQuery)];
                case 1:
                    rows = (_a.sent()).rows;
                    return [2 /*return*/, rows];
                case 2: return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, {
                            log: "dbConnection.js.queryTables: ERROR: " + err_1,
                            status: 400,
                            message: { err: 'An error occured' }
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
// Given a table name, return all columns of that table in an array of objects
dbInstance.prototype.queryColumns = function (tableName) {
    return __awaiter(this, void 0, void 0, function () {
        var query, rows, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = "\n    SELECT column_name, data_type\n    FROM information_schema.columns\n    WHERE table_name = '" + tableName + "';\n    ";
                    return [4 /*yield*/, this.query(query)];
                case 1:
                    rows = (_a.sent()).rows;
                    return [2 /*return*/, rows];
                case 2:
                    err_2 = _a.sent();
                    return [2 /*return*/, {
                            log: "dbConnection.js.queryColumns: ERROR: " + err_2,
                            status: 400,
                            message: { err: 'An error occured' }
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
// Returns query for all primary keys of a database
dbInstance.prototype.queryPKey = function () {
    return __awaiter(this, void 0, void 0, function () {
        var query, rows, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = "\n    SELECT conrelid::regclass AS table_name,\n    conname AS primary_key, \n    pg_get_constraintdef(oid) \n    FROM   pg_constraint \n    WHERE  contype = 'p'\n    AND    connamespace = 'public'::regnamespace   \n    ORDER  BY conrelid::regclass::text, contype DESC; \n    ";
                    return [4 /*yield*/, this.query(query)];
                case 1:
                    rows = (_a.sent()).rows;
                    return [2 /*return*/, rows];
                case 2:
                    err_3 = _a.sent();
                    return [2 /*return*/, {
                            log: "dbConnection.js.queryPKey: ERROR: " + err_3,
                            status: 400,
                            message: { err: 'An error occured' }
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
// Returns query for all 
dbInstance.prototype.queryFKeys = function () {
    return __awaiter(this, void 0, void 0, function () {
        var query, rows, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = "\n    SELECT conrelid::regclass AS table_name, \n    conname AS foreign_key, \n    pg_get_constraintdef(oid) \n    FROM   pg_constraint \n    WHERE  contype = 'f' \n    AND    connamespace = 'public'::regnamespace   \n    ORDER  BY conrelid::regclass::text, contype DESC;\n    ";
                    return [4 /*yield*/, this.query(query)];
                case 1:
                    rows = (_a.sent()).rows;
                    return [2 /*return*/, rows];
                case 2:
                    err_4 = _a.sent();
                    return [2 /*return*/, {
                            log: "dbConnection.js.queryFKeys: ERROR: " + err_4,
                            status: 400,
                            message: { err: 'An error occured' }
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
dbInstance.prototype.queryTableLayout = function (tableName) {
    return __awaiter(this, void 0, void 0, function () {
        var query, rows, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = "\n    SELECT table_name, column_name, is_nullable, data_type\n    FROM information_schema.columns\n    WHERE table_schema = 'public' AND table_name = '" + tableName + "'\n    ";
                    return [4 /*yield*/, this.query(query)];
                case 1:
                    rows = (_a.sent()).rows;
                    return [2 /*return*/, rows];
                case 2:
                    err_5 = _a.sent();
                    return [2 /*return*/, {
                            log: "dbConnection.js.queryTableLayout: ERROR: " + err_5,
                            status: 400,
                            message: { err: 'An error occured' }
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var sWAPI = new dbInstance('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj');
module.exports = dbInstance;
