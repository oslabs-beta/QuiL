require('dotenv').config();
const { Pool } = require('pg');

let inputURI;

const PG_URI =
inputURI || 'postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
