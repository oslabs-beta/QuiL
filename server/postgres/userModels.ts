import { Pool } from 'pg';
import { dbInstance } from '../db/dbConnection';

const connectionString =
  'postgres://enajtcbr:Y8qxFs9nSsuK55SN-Rqgd1SUfvIMTOSE@heffalump.db.elephantsql.com/enajtcbr';

const quilDbConnection = new (dbInstance as any)(connectionString);
export { quilDbConnection };
