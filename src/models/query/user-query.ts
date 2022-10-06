import { db } from "../database/connection";
import UserModels from "../interface/user-models";

/**
 * @function getUserByEmail :async - get user by email
 * @param {string} email:string - email of user
 * @returns {UserModels.IUserLoginQuery | false} IUserLoginQuery | false
 */
async function getUserByEmail (email: string): Promise<UserModels.IUserLoginQuery | false> {
  const result: UserModels.IUserLoginQuery[] = await db.query(
    `SELECT "id", "password", "is_admin" FROM "user" WHERE "email" = '${email}'`);
  if(result.length === 0) {
    return false;
  }
  return result[0];
}

/**
 * @function signupUser :async - signup user
 * @param {string} email:string - email of user
 * @param {string} password:string - password of user
 * @returns {Promise<number>} Promise<number>
 */
async function signupUser (email: string, password: string): Promise<number> {
  const result = await db.query(
    `INSERT INTO "user" ("email", "password")
    VALUES ('${email}', '${password}')
    RETURNING "id"`);
  return result;
}

/**
 * @function signupUser :async - check if the user exists based on email
 * @param {string} email:string - email of user
 * @returns {boolean} boolean
 */
async function userExists (email: string): Promise<boolean> {
  const result = await db.query(
    `SELECT "id" FROM "user" WHERE "email" = '${email}'`);

  if(result.length === 0) {
    return false;
  }
  return true;
}

export default {
  getUserByEmail,
  signupUser,
  userExists
} as const;
