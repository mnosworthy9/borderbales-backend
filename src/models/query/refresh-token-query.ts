import { db } from "../database/connection";

/**
 * @function insertRefreshToken :async - insert refresh token into db
 * @param {number} userId:number - user id
 * @param {string} refreshToken:string - refresh token
 * @returns {Promise<boolean>} Promise<boolean>
 */
async function insertRefreshToken (userId: number, refreshToken: string): Promise<boolean> {
  const exists: number[] = await db.query(
    `SELECT "id" FROM "refresh_token" WHERE "id" = ${userId}` // can improve the sql here 
  );

  console.log(exists);
  
  
  if(exists[0] === undefined){

    const token: string = await db.query(
      `INSERT INTO "refresh_token" ("id", "token")
      VALUES (${userId}, '${refreshToken}')
      RETURNING "token"`
    );
    console.log(token);
    
    if(token === refreshToken) {
      return true;
    }
    return false;
  }

  const result: {token: string}[] = await db.query(
    `UPDATE "refresh_token"
    SET "token" = '${refreshToken}'
    WHERE "id" = ${userId}
    RETURNING "token"`
  );

  if(result[0].token === refreshToken) {
    return true;
  }
  return false;
  
}

/**
 * checks if the user refresh token matches
 * @param userId 
 * @param refreshToken 
 */
export const checkRefreshToken = async (userId: number, refreshToken: string): Promise<boolean> => {
  const check: boolean = await db.query(
    `SELECT EXISTS(SELECT 1 FROM refresh_token
    WHERE id = ${userId}
    AND token = ${refreshToken})`
  );

  return check;
}

export default {
  insertRefreshToken,
} as const;

// move to database /views 
