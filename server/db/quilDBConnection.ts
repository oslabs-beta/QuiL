import { dbInstance } from './dbConnection';

const quilDbConnection = new (dbInstance as any)(
  process.env.QUIL_DB_CONNECTION_STRING
);
export { quilDbConnection };
