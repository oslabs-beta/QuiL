const pluralize = require('pluralize');
// TODO: Combine and refactor Type definitions
import { ArgType, ResolverStrings, TableResolver } from './types';
import { quilDbConnection as db } from './db/quilDBConnection';

/*
This function creates the actual function defintions for resolvers related to the user's data base.
This allows the functions definitions to be passed to makeResolverStrings which stringifies the 
defintions so they can be sent to the frontend
*/

export type node = {
  name: string;
  primaryKey: string;
  columns: columns;
  edges: edge[];
};

export type edge = {
  fKey: string;
  refTable: string;
};
export type columns = column[];

export type column = {
  columnName: string;
  dataType: string;
};

const makeResolverFunctions = (node: node): TableResolver => {
  const getOne = async (_: any, args: ArgType) => {
    const query = `SELECT * FROM ${node.name} WHERE ${node.primaryKey} = $1`;
    const values = [args._id];
    const { rows } = await db.query(query, values);
    return rows;
  };

  const getAll = async () => {
    const query = `SELECT * FROM ${node.name}`;
    const values = [node.name];
    const { rows } = await db.query(query, values);
    return rows;
  };

  return {
    getOne,
    getAll,
  };
};
/*
This function resolves the template literals and formats the fucntions in a string form so they
can be easily displayed in the code mirrors on the frontend
*/
const makeResolverStrings = (
  node: node,
  resolvers: TableResolver
): ResolverStrings => {
  let singular = pluralize.singular(node.name);
  if (singular === node.name) singular = singular + 'ById';
  const getOneString =
    `${singular}: ` +
    resolvers.getOne
      .toString()
      .replace(/\${node.name}/, node.name)
      .replace(/\${node.primaryKey}/, node.primaryKey);

  const resolver =
    `\n    ${node.name}: ` +
    resolvers.getAll.toString().replace(/\${node.name}/, node.name) +
    `\n\n    ${getOneString}`;

  return {
    tableName: node.name,
    resolver,
  };
};

export { makeResolverFunctions, makeResolverStrings };
