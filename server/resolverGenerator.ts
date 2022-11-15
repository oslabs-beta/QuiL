const pluralize = require('pluralize');
import { getNodesInside } from '@reactflow/core/dist/esm/utils/graph';
import { node } from '../app/(root)/fronendTypes';
import res from '../app/Main/(flow)/dummyRes';
import { dbInstance } from './db/dbConnection';
import { ArgType, nodeShape, ResolverStrings, TableResolver } from './types';

// Test variable
const node: node = {
  name: 'species',
  primaryKey: '_id',
  columns: [
    {
      columnName: '_id',
      dataType: 'integer',
    },
    {
      columnName: 'homeworld_id',
      dataType: 'bigint',
    },
    {
      columnName: 'classification',
      dataType: 'character varying',
    },
    {
      columnName: 'average_height',
      dataType: 'character varying',
    },
    {
      columnName: 'average_lifespan',
      dataType: 'character varying',
    },
    {
      columnName: 'hair_colors',
      dataType: 'character varying',
    },
    {
      columnName: 'skin_colors',
      dataType: 'character varying',
    },
    {
      columnName: 'eye_colors',
      dataType: 'character varying',
    },
    {
      columnName: 'language',
      dataType: 'character varying',
    },
    {
      columnName: 'name',
      dataType: 'character varying',
    },
  ],
  edges: [
    {
      fKey: 'homeworld_id',
      refTable: 'planets',
    },
  ],
};

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
  const getOneString = resolvers.getOne
    .toString()
    .replace(/\${node.name}/, node.name)
    .replace(/\${node.primaryKey}/, node.primaryKey);

  const getAllString = resolvers.getAll
    .toString()
    .replace(/\${node.name}/, node.name);

  return {
    tableName: node.name,
    getOneString,
    getAllString,
  };
};

export { makeResolverFunctions, makeResolverStrings };
