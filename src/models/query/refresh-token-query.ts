import { db } from "../../database/connection";

/**
 * Insert or update refresh token into db
 * @param userId - user id
 * @param refreshToken - refresh token
 * @returns The ID of the inserted refresh token
 */
export async function upsertRefreshToken (userId: number, refreshToken: string): Promise<boolean> {
  return await db.query("SELECT upsert_refresh_token($1, $2)", [userId, refreshToken]);
}

/**
 * Checks if the user refresh token matches
 * @param userId - User ID
 * @param refreshToken - Refresh token
 * @returns Boolean indicating if the token matches
 */
export async function checkRefreshTokenMatches (userId: number, refreshToken: string): Promise<boolean> {
  const result: [{exists: boolean}] = await db.query(
    "SELECT EXISTS (" +
       "SELECT 1 FROM \"refresh_token\"" +
       "WHERE \"id\" = $1 AND \"token\" = $2" +
    ")",
    [userId, refreshToken]
  );

  return result[0]?.exists ?? false;
}
