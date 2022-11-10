// function to write statement for PostgresQL to grab table names/data types of tables, foreign keys, primary keys
const dbInstance = require('./db/dbConnection');

// test Quitr instance:
// const db = new dbInstance('postgres://nsjouiot:4nVVHLiARTADoIiwArtQLG-HfkhQR03k@peanut.db.elephantsql.com/nsjouiot')

// inputting a database URI will grab all table names
grabTables = async db => {
  const tables = [];
  // if using postgresQL db:
  if (db.dbType === 'PostgreSQL') {
    // query string to grab all tables
    const tablesQuery = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_type='BASE TABLE';`;
    let dbQuery = await db.query(tablesQuery);
    for (let i = 0; i < dbQuery.rows.length; i++) {
      tables.push(dbQuery.rows[i]['table_name']);
    }
  }
  // console.log(tables);
  return tables;
};

grabColumns = async (db, table) => {
  const columnsQuery = `
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = '${table}';
    `;
  let dbQuery = await db.query(columnsQuery);
  const columns = dbQuery.rows.map(e => {
    return { columnName: e.column_name, dataType: e.data_type };
  });
  // console.log(columns);
  return columns;
};

// returns pKey of a given table within a databse (so that it grabs pKeys even if not named '_id')
grabPKey = async (db, table) => {
  if (!table) return undefined;
  if (db.dbType === 'PostgreSQL') {
    const pKeyQuery = `
        SELECT conrelid::regclass AS table_name,
        conname AS primary_key, 
        pg_get_constraintdef(oid) 
        FROM   pg_constraint 
        WHERE  contype = 'p'
        AND    connamespace = 'public'::regnamespace   
        ORDER  BY conrelid::regclass::text, contype DESC; 
        `;
    const dbQuery = await db.query(pKeyQuery);
    const primaryKeys = dbQuery.rows;
    let unparsedPKey;
    let pKey = '';
    for (let i = 0; i < primaryKeys.length; i++) {
      let el = primaryKeys[i];
      if (el.table_name === table) {
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
    // console.log(pKey);
    return pKey;
  }
  // in case table is not found
  return 'table not found';
};

// given a table, returns foreign keys
grabFKeys = async (db, table) => {
  const foreignKeys = [];
  if (db.dbType === 'PostgreSQL') {
    const fKeysQuery = `
        SELECT conrelid::regclass AS table_name, 
        conname AS foreign_key, 
        pg_get_constraintdef(oid) 
        FROM   pg_constraint 
        WHERE  contype = 'f' 
        AND    connamespace = 'public'::regnamespace   
        ORDER  BY conrelid::regclass::text, contype DESC;
        `;
    let dbQuery = await db.query(fKeysQuery);
    const allFKeys = dbQuery.rows;
    let tableFKeys = [];
    for (let i = 0; i < allFKeys.length; i++) {
      let el = allFKeys[i];
      if (el.table_name === table) tableFKeys.push(el);
    }
    // console.log(tableFKeys);
    for (let j = 0; j < tableFKeys.length; j++) {
      const fKeyObj = {};
      let unparsedFKey = tableFKeys[j].pg_get_constraintdef;
      // parse out foreign key
      let fKey = '';
      let inFirstParens = false;
      for (let k = 0; k < unparsedFKey.length; k++) {
        let char = unparsedFKey[k];
        if (char === ')') {
          inFirstParens = false;
          break;
        }
        if (inFirstParens === true) fKey += char;
        if (char === '(') inFirstParens = true;
      }
      // parse out reference table
      let keyword = 'REFERENCES ';
      let escapeChar = '(';
      let indexStartKeyword = unparsedFKey.indexOf(keyword);
      let fKeyRefUnsliced = unparsedFKey.slice(
        indexStartKeyword + keyword.length
      );
      let indexOfEscapeChar = fKeyRefUnsliced.indexOf(escapeChar);
      let fKeyRef = fKeyRefUnsliced.slice(0, indexOfEscapeChar);
      // fKeyObj[fKey] = fKeyRef;
      fKeyObj.fKey = fKey;
      fKeyObj.refTable = fKeyRef;
      foreignKeys.push(fKeyObj);
    }
  }
  console.log(foreignKeys);
  return foreignKeys;
};

makeNodes = async db => {
  console.log('Calling Nodes');
  const arrOfNodes = [];
  if (db.dbType === 'PostgreSQL') {
    console.log('entering if');
    const tables = await grabTables(db);
    for (let i = 0; i < tables.length; i++) {
      const table = { name: `${tables[i]}` };
      table.primaryKey = await grabPKey(db, table.name);
      table.columns = await grabColumns(db, tables[i]); // this is for an array of objs with key-value column_id: data_type
      // let FKeys = await grabFKeys(, table.name);
      // const attributeArr = [];
      // for (let j = 0; j < FKeys.length; j++) {
      //     let obj = FKeys[j];
      //     attributeArr.push(Object.keys(obj)[0]);
      // }
      // table.attributeNames = attributeArr;
      // let attributeNames = await Object.keys(grabFKeys(, table.name));
      // console.log(`these are attribute names: ${attributeNames}`);
      table.edges = await grabFKeys(db, tables[i]);
      // console.log(table);
      arrOfNodes.push(table);
    }
  }
  // console.log(arrOfNodes);
  // console.log(arrOfNodes[2]);
  return { nodes: arrOfNodes };
};

// test instance with Quitr DB
// const db = new dbInstance('postgres://nsjouiot:4nVVHLiARTADoIiwArtQLG-HfkhQR03k@peanut.db.elephantsql.com/nsjouiot');
// console.log(db);
// console.log(db.dbType)
// makeNodes(db);

// test:
// const swapiSpecificTable = 'planets';
// grabTables();
// grabColumns(swapiSpecificTable)
// grabPKey(swapiSpecificTable);
// grabFKeys(swapiSpecificTable);
// makeNodes();

module.exports = makeNodes;
