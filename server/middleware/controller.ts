import { quilDbConnection } from '../postgres/userModels';
//import the db connection

// func to create new users  user/email/pw
const createAccount = async (em: string, usr: string, pw: string) => {
  const query = `INSERT INTO users (email,username,password)
  VALUES ( ${em}, ${usr}, ${pw});`;
  const data = await quilDbConnection.query(query);
  return data;
};

// func to save project user_id payload/string

const saveProject = async (savedproj: string, usr: string) => {
  const query = `INSERT INTO projects (saved_db, username)
  VALUES ( ${savedproj}, ${usr} );`;
  const data = await quilDbConnection.query(query);
  return data;
};
