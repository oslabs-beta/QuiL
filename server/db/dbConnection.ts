import { GlobalServerError, dbConstructor } from '../types';
require('dotenv').config();
const { Pool } = require('pg');
import { stringify } from 'querystring';

// const { stringify } = require('querystring');
// const { GlobalServerError, dbConstructor } = require('../types');

/* 
create a func that accepts URI input and exports/returns query obj that's being exported (line 21), then export said func
since return value is query obj, we can import it into helperFuncs
*/

function dbInstance(this: dbConstructor, inputURI: string ): void {
  if (inputURI.includes('postgres')) this.dbType = 'PostgreSQL';
  this.pool = new Pool({connectionString: inputURI});
  this.query = (text: string, params?: object, callback?: Function): Object => {
    // console.log('executed query', text);
    return this.pool.query(text, params, callback);
  }
};

// Given a database, return all table names in an array
dbInstance.prototype.queryTables = async function ():Promise<[] | GlobalServerError>  {
  try {
    if (this.dbType === 'PostgreSQL') {
      const tablesQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
      AND table_type='BASE TABLE';`;
      const { rows } = await this.query(tablesQuery);
      return rows;
    }
  } catch (err: unknown) {
    return {
      log: `dbConnection.js.queryTables: ERROR: ${err}`,
      status: 400,
      message: {err: 'An error occured'}
    }
  }
};

// Given a table name, return all columns of that table in an array of objects
dbInstance.prototype.queryColumns = async function (tableName: string):Promise<[] | GlobalServerError> {
  try {
    const query = `
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = '${tableName}';
    `;
    const { rows } = await this.query(query);
    return rows;
  } catch (err: unknown) {
    return {
      log: `dbConnection.js.queryColumns: ERROR: ${err}`,
      status: 400,
      message: {err: 'An error occured'}
    }
  }
};

// Returns query for all primary keys of a database
dbInstance.prototype.queryPKey = async function ():Promise<[] | GlobalServerError> {
  try {
    const query = `
    SELECT conrelid::regclass AS table_name,
    conname AS primary_key, 
    pg_get_constraintdef(oid) 
    FROM   pg_constraint 
    WHERE  contype = 'p'
    AND    connamespace = 'public'::regnamespace   
    ORDER  BY conrelid::regclass::text, contype DESC; 
    `;
    const { rows } = await this.query(query);
    return rows;
  } catch (err: unknown) {
    return {
      log: `dbConnection.js.queryPKey: ERROR: ${err}`,
      status: 400,
      message: {err: 'An error occured'}
    }
  }
};

// Returns query for all 
dbInstance.prototype.queryFKeys = async function ():Promise<[] | GlobalServerError> {
  try {
    const query = `
    SELECT conrelid::regclass AS table_name, 
    conname AS foreign_key, 
    pg_get_constraintdef(oid) 
    FROM   pg_constraint 
    WHERE  contype = 'f' 
    AND    connamespace = 'public'::regnamespace   
    ORDER  BY conrelid::regclass::text, contype DESC;
    `;
    const { rows } = await this.query(query)
    return rows;
  } catch (err: unknown) {
    return {
      log: `dbConnection.js.queryFKeys: ERROR: ${err}`,
      status: 400,
      message: {err: 'An error occured'}
    }
  }
};


dbInstance.prototype.queryTableLayout = async function (tableName: string):Promise<[] | GlobalServerError> {
  try {
    const query = `
    SELECT table_name, column_name, is_nullable, data_type
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = '${tableName}'
    `;
    const { rows } = await this.query(query)
    return rows;
  } catch (err: unknown) {
    return {
      log: `dbConnection.js.queryTableLayout: ERROR: ${err}`,
      status: 400,
      message: {err: 'An error occured'}
    }
  }
};

const sWAPI = new (dbInstance as any)('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj');

export {dbInstance}
