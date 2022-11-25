import { type } from 'os';
import Resolver from '../app/Main/Chart/(components)/Resolver';

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
  isIntersectionTable: boolean;
};

export type objectOfArrOfNodes = {
  nodes: nodeShape[];
};

// TODO: change schema types
export type schema = {
  [key: string]: any;
};

export type pSQLToGQL = {
  [key: string]: string;
};

// Server Types
export type QuiLData = {
  nodes: nodeShape[];
  resolvers: ResolverStrings[];
  schemas: SingleSchemaType[];
};

export type TableResolver = {
  getOne: Function;
  getAll: Function;
};

export type ResolverStrings = {
  tableName: String;
  resolver: string;
};

export type TableResolver1 = Function;

export interface ArgType {
  uri?: String;
  _id?: String;
  node?: nodeShape;
}

export type SingleSchemaType = {
  tableName: String;
  schemas: String;
};

// andres added newuser
export type NewUser = {
  email: string;
  username: string;
  password: string;
};

export type SaveProject = {
  projectName: string;
  projectData: string;
  userId: string;
};

export type CreateAccountRes = {
  success: Boolean;
  userId?: Number;
  token?: String;
};

export type SavedProjectRes = {
  projectName?: String;
  success: Boolean;
  projectId?: Number;
};

export type GetUserProjectRes = {
  saved_db?: String[];
  success: Boolean;
};

export type GetUser = {
  username: String;
  password: String;
};

export type GetUserRes = {
  id_?: Number;
  success: Boolean;
};
