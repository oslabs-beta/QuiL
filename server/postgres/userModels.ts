import { Pool } from 'pg';
import { dbInstance } from '../db/dbConnection';

const connectionString =
  'postgres://enajtcbr:Y8qxFs9nSsuK55SN-Rqgd1SUfvIMTOSE@heffalump.db.elephantsql.com/enajtcbr';

const quilDbConnection = new (dbInstance as any)(connectionString);
export { quilDbConnection };

export const userCreateQuery = {
  Query: {
    newUser(_: any, obj: newUser) {
      return obj; // returns an obj that contains em usr pw
    },
  },
};
type newUser = {
  email: String;
  username: String;
  password: String;
};

const fakeUser = {
  email: 'andres@quil.com',
  username: 'QuiL',
  password: 'QL4u',
};
