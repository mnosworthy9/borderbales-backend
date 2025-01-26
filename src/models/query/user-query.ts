import { db } from "../../database/connection";
import UserModels from "../interface/user-models";
import {myDataSource} from "../../database/app-data-source";
import {Users} from "../../database/entities/users";

/**
 * Get user by email
 * @param email - Email of the user.
 * @returns - Details of the user to make tokens.
 */
export async function getUserByEmailQuery (email: string): Promise<UserModels.ILoginQuery | false> {
  myDataSource.getRepository<Users>("Users").find({
    select: ["id", "email", "isAdmin"]
  })
  const result: UserModels.ILoginQuery[] = await db.query(
    `SELECT "id", "password", "is_admin" FROM "user" WHERE "email" = '${email}'`);
  if(result.length === 0) {
    return false;
  }
  return result[0];
}

/**
 * signup user.
 * @param credentials emails and password for user.
 * @returns the user id and if the user is an admin.
 */
export async function signupUserQuery (credentials: UserModels.IAuthRequest): Promise<UserModels.ITokenData | string> {
  try {

    const result: [UserModels.ITokenData] | string = await db.query(
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
export async function checkUserExistsQuery (email: string): Promise<boolean> {
  const result = await db.query(
    `SELECT "id" FROM "user" WHERE "email" = '${email}'`);

  return result.length !== 0;
}
