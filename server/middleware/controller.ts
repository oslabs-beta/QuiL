import { quilDbConnection } from '../postgres/userModels';

export const createAccount = async (em: string, usr: string, pw: string) => {
  try {
    const query = `INSERT INTO users (email,username,password)\
  VALUES ($1, $2, $3) RETURNING *;`;
    const values = [em, usr, pw];
    const { rows } = await quilDbConnection.query(query, values);
    return rows;
  } catch (err) {
    console.log(err, ' inside create Account');
  }
};

export const saveProject = async (
  projname: string,
  savedproj: string,
  usr: number
) => {
  try {
    const query = `INSERT INTO projects (name, saved_db, owner_id)\
    VALUES ( $1, $2, (SELECT _id FROM users WHERE _id = $3)) RETURNING *;`;
    const values = [projname, savedproj, usr];
    const { rows } = await quilDbConnection.query(query, values);
    return rows;
  } catch (err) {
    console.log(err, ' inside saveProject');
  }
};
