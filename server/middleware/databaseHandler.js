const dbInstance = require('../db/dbConnection');
const makeNodes = require('../helperFunctions');

module.exports = {
  sendNodes: uri => makeNodes(new dbInstance(uri)),
};
