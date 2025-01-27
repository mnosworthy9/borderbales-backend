import { myDataSource } from "src/database/app-data-source";
import { db } from "../../database/connection";
import { nameof } from "@util/functions";
import { RefreshToken } from "src/database/entities/refresh-token";

/**
 * Insert or update refresh token into db
 * @param userId - user id
 * @param refreshToken - refresh token
 * @returns The ID of the inserted refresh token
 */
export async function upsertRefreshToken (userId: number, refreshToken: string): Promise<boolean> {
  await myDataSource.getRepository("RefreshToken")
    .createQueryBuilder()
    .insert()
    .values({ [nameof<RefreshToken>("id")]: userId, [nameof<RefreshToken>("token")]: refreshToken })
    .orUpdate([nameof<RefreshToken>("token")], [nameof<RefreshToken>("id")])
    .execute();

  return true;
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
