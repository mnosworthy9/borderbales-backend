import { db } from "../database/connection";

/**
 * @function insertRefreshToken :async - insert refresh token into db
 * @param {number} userId:number - user id
 * @param {string} refreshToken:string - refresh token
 * @returns {Promise<boolean>} Promise<boolean>
 */
async function insertRefreshToken (userId: number, refreshToken: string): Promise<boolean> {
  const exists: number[] = await db.query(
    `SELECT "id" FROM "refresh_token" WHERE "id" = ${userId}`
  );
  
  if(exists[0] === null){

    const result: {token: string}[] = await db.query(
      `INSERT INTO "refresh_token" ("id", "token")
      VALUES (${userId}, '${refreshToken}')
      RETURNING "token"`
    );
      
    if(result[0].token === refreshToken) {
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

export default {
  insertRefreshToken,
} as const;
