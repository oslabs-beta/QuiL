import { type } from 'os';
import Resolver from '../app/Main/(components)/Resolver';

export type GlobalServerError = {
  log: string;
  status: number;
  message: { err: string };
};

export type dbConstructor = {
  new (s: string): object;
  dbType: string;
  query: Function;
  pool: { query: Function };
  queryTables: Function;
  queryColumns: Function;
  queryPKey: Function;
  queryFKeys: Function;
  queryTableLayout: Function;
};

export type unparsedColumnShape = {
  column_name: string;
  data_type: string;
};

export type parsedColumnShape = {
  columnName: string;
  dataType: string;
};

export type unparsedKeys = {
  table_name: string;
  pg_get_constraintdef: string;
};

export type parsedFKeys = {
  fKey: string;
  refTable: string;
};

export type nodeShape = {
  name: string;
  primaryKey: string;
  columns: parsedColumnShape[];
  edges: parsedFKeys[];
};

export type objectOfArrOfNodes = {
  nodes: nodeShape[];
};

export type schema = {
  [k: string]: string;
};

// Server Types
export type QuiLData = {
  nodes: nodeShape[];
  resolvers: ResolverStrings[];
  schemas: string[];
};

export type TableResolver = {
  getOne: Function;
  getAll: Function;
};

export type ResolverStrings = {
  tableName: String;
  getOneString: String;
  getAllString: String;
};

export type TableResolver1 = Function;

export interface ArgType {
  uri?: String;
  _id?: String;
  node?: nodeShape;
}
