const bcrypt = require('bcrypt');
import { quilDbConnection } from '../postgres/userModels';
import {
  SaveProject,
  SavedProjectRes,
  GetUserProjectRes,
  CreateNewUserObject,
  CreateNewAccountResponse,
} from '../types';

export const createAccount = async (
  newUserObject: CreateNewUserObject
): Promise<CreateNewAccountResponse> => {
  try {
    let values = [];
    if (newUserObject.oauthUser) {
      const { name, username, avatarUrl } = newUserObject;
      values = [username, name, avatarUrl, null];
    } else {
      const { username, password } = newUserObject;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      values = [username, null, null, hashedPassword];
    }

    const query = `INSERT INTO users (username, name, avatar_url, password)\
    VALUES ($1, $2, $3, $4) RETURNING *;`;

    const { rows } = await quilDbConnection.query(query, values);

    return {
      success: true,
      userId: rows[0]._id,
      username: rows[0].username,
      name: rows[0].name,
      avatarUrl: rows[0].avatar_url,
    };
  } catch (err) {
    console.log(err.message);

    return { success: false, username: null, userId: null };
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

export async function getQuilUser(
  username: string
): Promise<CreateNewAccountResponse> {
  try {
    const queryString = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const { rows } = await quilDbConnection.query(queryString, values);
    return {
      success: true,
      username: rows[0].username,
      userId: rows[0]._id,
      name: rows[0].name,
      avatarUrl: rows[0].avatar_url,
    };
  } catch (error) {
    console.log(error.message);

    return { success: false, username: null, userId: null };
  }
}
