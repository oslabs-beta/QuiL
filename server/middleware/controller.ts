const bcrypt = require('bcrypt');
import { resolve } from 'path';
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
    const { username, password } = obj;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const query = `INSERT INTO users (username,password)\
    VALUES ($1, $2) RETURNING *;`;
    const values = [username, hashedPassword];
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
    // const salt = await bcrypt.genSalt(10);
    // const hashedProjectData = await bcrypt.hash(projectData, salt);
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
      db: [],
      success: true,
    };
    rows.forEach((el: any) => {
      resObj.db.push(el);
    });
    console.log(resObj);
    return resObj;
  } catch (err) {
    return { success: false };
  }
};

export const validateUser = async (isUser: any) => {
  try {
    const { username, password } = isUser;
    const query = `SELECT * FROM users WHERE username = $1;`;
    const values = [username];
    const { rows } = await quilDbConnection.query(query, values);
    if (rows.length === 0) return { success: false };
    else {
      const hashPass = rows[0].password;
      const result = await bcrypt.compare(password, hashPass);
      if (!result) return { success: false };
      return { id_: rows[0]._id, success: true };
    }
  } catch (err) {
    console.log(err, ' inside validate catch block');
  }
};
