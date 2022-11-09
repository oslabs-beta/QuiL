require('dotenv').config();
const { Pool } = require('pg');

// create a func that accepts URI input and exports/returns query obj that's being exported (line 21)
// then export said func
// since return value is query obj, we can import it into helperFuncs

function dbInstance( inputURI ) {
  this.dbType;
  if (inputURI.includes('postgres')) this.dbType = 'PostgreSQL';
  // TODO (extension): write else statements for other db type identifiers
  this.pool = new Pool({connectionString: inputURI});
  this.query = (text, params, callback) => {
    console.log('executed query', text);
    return this.pool.query(text, params, callback);
  }
};

// TODO: modularizing 1 step further
// // return line 18 on helper functions
// dbInstance.prototype.retrieveTables = () => {
//   const tablesQuery = `
//   SELECT table_name
//   FROM information_schema.tables
//   WHERE table_schema='public'
//   AND table_type='BASE TABLE';`;
//   const { rows } = this.query(tablesQuery);
//   return rows;
// }

// then pass retrieveTables into parseTables (which takes evaluated result of retrieveTables)

module.exports = dbInstance;
