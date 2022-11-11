const dbInstance = require('./db/dbConnection');
const {makeNodes} = require('./helperFunctions');

const db = new dbInstance('postgres://eitysjmj:At82GArc1PcAD4nYgBoAODn0-XvBYo-A@peanut.db.elephantsql.com/eitysjmj');
makeNodes(db);

const generateSchemas = () => {
    console.log('creating Schemas')
};