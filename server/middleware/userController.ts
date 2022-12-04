const bcrypt = require('bcrypt');
import { quilDbConnection } from '../db/quilDBConnection';
import {
  SaveProject,
  SavedProjectRes,
  CreateNewUserObject,
  CreateNewAccountResponse,
  GetUser,
} from '../types';
import * as dotenv from 'dotenv';

export const userController = {
  createAccount: async (
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
  },
  saveProject: async (obj: SaveProject): Promise<SavedProjectRes> => {
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
  },
  getUserProject: async (userId: Number) => {
    try {
      const query = `SELECT * FROM projects WHERE owner_id = $1;`;
      const values = [userId];
      const { rows } = await quilDbConnection.query(query, values);
      const resObj: any = {
        db: [],
        success: true,
      };
      rows.forEach((el: any) => {
        resObj.db.push(el);
      });
      return resObj;
    } catch (err) {
      return { success: false };
    }
  },
  validateUser: async (isUser: GetUser): Promise<CreateNewAccountResponse> => {
    try {
      const { username, password } = isUser;
      const query = `SELECT * FROM users WHERE username = $1;`;
      const values = [username];
      const { rows } = await quilDbConnection.query(query, values);
      if (rows.length === 0)
        return { success: false, username: null, userId: null };
      else {
        const hashPass = rows[0].password;
        const result = await bcrypt.compare(password, hashPass);
        if (!result) return { success: false, username: null, userId: null };
        return {
          success: true,
          userId: rows[0]._id,
          username: rows[0].username,
          name: rows[0].name,
          avatarUrl: rows[0].avatar_url,
        };
      }
    } catch (err) {
      console.log(err, ' inside validate catch block');
    }
  },
  getQuilUser: async (username: string): Promise<CreateNewAccountResponse> => {
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
  },
  deleteProject: async (projectId: number): Promise<any> => {
    try {
      const queryString = 'DELETE FROM projects WHERE _id = $1;';
      const values = [projectId];
      const { rows } = await quilDbConnection.query(queryString, values);
      return {
        deleted: true,
      };
    } catch (error) {}
  },
};
