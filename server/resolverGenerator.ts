const pluralize = require('pluralize');
import { getNodesInside } from '@reactflow/core/dist/esm/utils/graph';
import { node } from '../app/(root)/frontendTypes';
import res from '../app/Main/Chart/(flow)/dummyRes';
import { dbInstance } from './db/dbConnection';
import { ArgType, nodeShape, ResolverStrings, TableResolver } from './types';

// Test variable

const db = new (dbInstance as any)(
  'postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk'
);
// ##################

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
