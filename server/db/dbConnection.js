require('dotenv').config();
const { Pool } = require('pg');

// create a func that accepts URI input and exports/returns query obj that's being exported (line 21)
// then export said func
// since return value is query obj, we can import it into helperFuncs

function dbInstance( inputURI ) {
  if (inputURI.includes('postgres')) this.dbType = 'PostgreSQL';
  this.pool = new Pool({connectionString: inputURI});
  this.query = (text, params, callback) => {
    // console.log('executed query', text);
    return this.pool.query(text, params, callback);
  }
};

// TODO: add catch blocks into func methods
// return line 18 on helper functions
// Given a database, return all table names in an array
dbInstance.prototype.queryTables = async function () {
  try {
    if (this.dbType === 'PostgreSQL') {
      const tablesQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
      AND table_type='BASE TABLE';`;
      const { rows } = await this.query(tablesQuery);
      // console.log(rows);
      return rows;
    }
  } catch (err) {
    return {
      log: `dbConnection.js: ERROR: ${err}`,
    }
  }
};

// Given a table name, return all columns of that table in an array of objects
dbInstance.prototype.queryColumns = async function (tableName) {
  try {
    const query = `
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = '${tableName}';
    `;
    const { rows } = await this.query(query);
    // console.log(rows);
    return rows;
  } catch (err) {
    return {
      log: `dbConnection.js: ERROR: ${err}`,
    }
  }
};

// Returns query for all primary keys of a database
dbInstance.prototype.queryPKey = async function () {
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
    // console.log(rows);
    return rows;
  } catch (err) {
    return {
      log: `dbConnection.js: ERROR: ${err}`,
    }
  }
};

// Returns query for all 
dbInstance.prototype.queryFKeys = async function () {
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
    // console.log(rows);
    return rows;
  } catch (err) {
    return {
      log: `dbConnection.js: ERROR: ${err}`,
    }
  }
};


dbInstance.prototype.queryTableLayout = async function (tableName) {
  try {
    const query = `
    SELECT table_name, column_name, is_nullable, data_type
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'people'
    `;
    const { rows } = await this.query(fKeysQuery)
    // console.log(rows);
    return rows;
  } catch (err) {
    return {
      log: `dbConnection.js: ERROR: ${err}`,
    }
  }
};

// then pass retrieveTables into parseTables (which takes evaluated result of retrieveTables)

module.exports = dbInstance;
