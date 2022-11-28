import { dbInstance } from './dbConnection';
import * as dotenv from 'dotenv';
dotenv.config();

const quilDbConnection = new (dbInstance as any)(
  process.env.QUIL_DB_CONNECTION_STRING
);
export { quilDbConnection };
