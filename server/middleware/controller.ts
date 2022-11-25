import { quilDbConnection } from '../postgres/userModels';
import {
  SaveProject,
  NewUser,
  CreateAccountRes,
  SavedProjectRes,
  GetUserProjectRes,
} from '../types';

export const createAccount = async (
  obj: NewUser
): Promise<CreateAccountRes> => {
  try {
    const { email, username, password } = obj;
    const query = `INSERT INTO users (email,username,password)\
  VALUES ($1, $2, $3) RETURNING *;`;
    const values = [email, username, password];
    const { rows } = await quilDbConnection.query(query, values);
    return { success: true, userId: rows[0]._id, token: 'token' };
  } catch (err) {
    return { success: false };
  }
};

export const saveProject = async (
  obj: SaveProject
): Promise<SavedProjectRes> => {
  try {
    const { projectName, projectData, userId } = obj;
    const query = `INSERT INTO projects (name, saved_db, owner_id)\
    VALUES ( $1, $2, (SELECT _id FROM users WHERE _id = $3)) RETURNING *;`;
    const values = [projectName, projectData, userId];
    const { rows } = await quilDbConnection.query(query, values);
    return { projectName: projectName, success: true };
  } catch (err) {
    return { success: false };
  }
};

export const getUserProject = async (userId: Number) => {
  try {
    const query = `SELECT name, owner_id, saved_db FROM projects WHERE owner_id = 1;`;
    const { rows } = await quilDbConnection.query(query);
    const resObj: any = {
      name: [],
      owner_id: null,
      saved_db: [],
      success: true,
    };

    rows.forEach((el: any) => {
      console.log(el, ' line 52');
    });
    // console.log(rows);
    for (let i = 0; i < rows.length; i++) {
      resObj.name.push(rows[i].name);
      resObj.owner_id = rows[i].owner_id;
      resObj.saved_db.push(rows[i].saved_db);
    }
    console.log(resObj);
    return resObj;
  } catch (err) {
    console.log('start reading here ', err);
    return { success: false };
  }
};

// console.log(getUserProject(1));
