import { db } from "../database/connection";
import UserModels from "../interface/user-models";

/**
 * @function getUserByEmail - Get user by email
 * @param email - Email of the user.
 * @returns - Details of the user to make tokens.
 */
async function getUserByEmail (email: string): Promise<UserModels.ILoginQuery | false> {
  const result: UserModels.ILoginQuery[] = await db.query(
    `SELECT "id", "password", "is_admin" FROM "user" WHERE "email" = '${email}'`);
  if(result.length === 0) {
    return false;
  }
  return result[0];
}

/**
 * @function signup signup user.
 * @param credentials emails and password for user.
 * @returns the user id and if the user is an admin.
 */
async function signup (credentials: UserModels.IAuthRequest): Promise<UserModels.ISignupQuery | string> {
  try {

    const result: [UserModels.ISignupQuery] | string = await db.query(
      `INSERT INTO "user" ("email", "password")
      VALUES ('${credentials.email}', '${credentials.password}')
      RETURNING "id", "is_admin"`);
      return result[0];
  } 
  catch (e) {
    if (e.constraint === "unq_email_user")
      return `EMAIL: ${credentials.email} already exists.`
    
    console.error(e);
    return "Error signing up user."
  }
}

/**
 * @function exists - check if the user exists based on email
 * @param email - email of user
 * @returns true if the users email exists.
 */
async function exists (email: string): Promise<boolean> {
  const result = await db.query(
    `SELECT "id" FROM "user" WHERE "email" = '${email}'`);

  return result.length !== 0;
}

export default {
  getUserByEmail,
  signup,
  exists
} as const;
