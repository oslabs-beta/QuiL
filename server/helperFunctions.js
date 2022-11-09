// function to write statement for PostgresQL to grab table names/data types of tables, foreign keys, primary keys

const db = require('./db/dbConnection');

// inputting a database URI will grab all table names
const grabTables = async (URI) => {
    const tables = [];
    // if using postgresQL db:
    if (URI.includes('postgres')) {
        // query string to grab all tables
        const tablesQuery = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_type='BASE TABLE';`;
        let dbQuery = await db.query(tablesQuery);
        // console.log(dbQuery);
        // console.log(dbQuery.rows[0]);
        // console.log(dbQuery.rows[0]['table_name']);
        for (let i = 0; i < dbQuery.rows.length; i++) {
            tables.push(dbQuery.rows[i]['table_name']);
        };
    };
    return tables;
};

// // test:
// grabTables('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj');

// inputting a table name will generate an array of key-value pairs: columnName: dataType
// currently written or postgresQL only
// const grabColumns = async (table) => {
//     const columns = {};
//     const columnsQuery = `
//     SELECT column_name, data_type
//     FROM information_schema.columns
//     WHERE table_name = '${table}';
//     `;
//     let dbQuery = await db.query(columnsQuery);
//     for (let i = 0; i < dbQuery.rows.length; i++) {
//         let columnName = dbQuery.rows[i].column_name;
//         let dataType = dbQuery.rows[i].data_type;
//         columns[columnName] = dataType
//     }
//     return columns;
// }

const grabColumns = async (table) => {
    const columnsQuery = `
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = '${table}';
    `;
    let dbQuery = await db.query(columnsQuery);
    const columns = dbQuery.rows.map(e => {
        return {columnName: e.column_name, dataType: e.data_type}
    });
    // console.log(columns);
    return columns;
}

// test:
// const testTables = 'planets';
// grabColumns(testTables);

// returns PKey of a given table within a databse (so that it grabs PKeys even if not named '_id')
const grabPKey = async (URI, table) => {
    if (!URI || !table) return undefined;
    if (URI.includes('postgres')) {
        const PKeyQuery = `
        SELECT conrelid::regclass AS table_name,
        conname AS primary_key, 
        pg_get_constraintdef(oid) 
        FROM   pg_constraint 
        WHERE  contype = 'p'
        AND    connamespace = 'public'::regnamespace   
        ORDER  BY conrelid::regclass::text, contype DESC; 
        `;
        const dbQuery = await db.query(PKeyQuery);
        const primaryKeys = dbQuery.rows
        let unparsedPKey;
        let PKey = '';
        for (let i = 0; i < primaryKeys.length; i++) {
            let el = primaryKeys[i];
            if (el.table_name === table) {
                unparsedPKey = el.pg_get_constraintdef
            }
        }
        let inParens = false;
        for (let j = 0; j < unparsedPKey.length; j++) {
            let char = unparsedPKey[j];
            if (char === ')') inParens = false;
            if (inParens === true) PKey += char;
            if (char === '(') inParens = true;
        }
        // console.log(PKey);
        return PKey;
    };
    // in case table is not found
    return 'table not found'
};

// test:
// console.log(grabPKey('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj', 'planets'));

// given a table, returns foreign keys
const grabFKeys = async (URI, table) => {
    const foreignKeys = [];
    if (URI.includes('postgres')) {
        const FKeysQuery = `
        SELECT conrelid::regclass AS table_name, 
        conname AS foreign_key, 
        pg_get_constraintdef(oid) 
        FROM   pg_constraint 
        WHERE  contype = 'f' 
        AND    connamespace = 'public'::regnamespace   
        ORDER  BY conrelid::regclass::text, contype DESC;
        `;
        let dbQuery = await db.query(FKeysQuery);
        const allFKeys = dbQuery.rows;
        let tableFKeys = [];
        for (let i = 0; i < allFKeys.length; i++) {
            let el = allFKeys[i];
            if (el.table_name === table) tableFKeys.push(el); 
        }
        // console.log(tableFKeys);
        for (let j = 0; j < tableFKeys.length; j++) {
            const FKeyObj = {};
            let unparsedFKey = tableFKeys[j].pg_get_constraintdef;
            // parse out foreign key
            let FKey = '';
            let inFirstParens = false;
            for (let k = 0; k < unparsedFKey.length; k++) {
                let char = unparsedFKey[k];
                if (char ===')') {
                    inFirstParens = false;
                    break;
                }
                if (inFirstParens === true) FKey += char;
                if (char === '(') inFirstParens = true;
            }
            // parse out reference table
            let keyword = 'REFERENCES '
            let escapeChar = '('
            let indexStartKeyword = unparsedFKey.indexOf(keyword);
            let FKeyRefUnsliced = unparsedFKey.slice(indexStartKeyword + keyword.length);
            let indexOfEscapeChar = FKeyRefUnsliced.indexOf(escapeChar);
            let FKeyRef = FKeyRefUnsliced.slice(0, indexOfEscapeChar);
            // FKeyObj[FKey] = FKeyRef;
            FKeyObj.FKey = FKey;
            FKeyObj.refTable = FKeyRef;
            foreignKeys.push(FKeyObj);
        }
    };
    // console.log(foreignKeys);
    return foreignKeys;
};

// test:
// grabFKeys('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj', 'people');

const formatting = async (URI) => {
    const arrOfNodes = [];
    if (URI.includes('postgres')) {
        const tables = await grabTables(URI);
        for (let i = 0; i < tables.length; i++) {
            const table = {name: `${tables[i]}`};
            table.primaryKey = await grabPKey(URI, table.name);
            table.columns = await grabColumns(tables[i]); // this is for an array of objs with key-value column_id: data_type
            // let FKeys = await grabFKeys(URI, table.name);
            // const attributeArr = [];
            // for (let j = 0; j < FKeys.length; j++) {
            //     let obj = FKeys[j];
            //     attributeArr.push(Object.keys(obj)[0]);
            // }
            // table.attributeNames = attributeArr;
            // let attributeNames = await Object.keys(grabFKeys(URI, table.name));
            // console.log(`these are attribute names: ${attributeNames}`);
            table.edges = await grabFKeys(URI, tables[i]);
            // console.log(table);
            arrOfNodes.push(table);
        }
    }
    // console.log(arrOfNodes);
    console.log(arrOfNodes[2]);
    return arrOfNodes;
};

// test:
formatting('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj');

module.exports = { grabTables, grabColumns, grabFKeys, grabPKey, formatting };
