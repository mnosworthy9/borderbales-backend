import { myDataSource } from "src/database/app-data-source";
import { nameof } from "@util/functions";
import { RefreshToken } from "src/database/entities/refresh-token";
import { AuthDetails } from "@models/database/user-types";

/**
 * Insert or update refresh token into db
 * @param userId - user id
 * @param refreshToken - refresh token
 * @returns The ID of the inserted refresh token
 */
export async function upsertRefreshToken (authDetails: AuthDetails): Promise<boolean> {
  const results = await myDataSource.getRepository<RefreshToken>(nameof(RefreshToken))
    .createQueryBuilder()
    .insert()
    .values({ [nameof<RefreshToken>("id")]: authDetails.id, [nameof<RefreshToken>("token")]: authDetails.refreshToken })
    .orUpdate([nameof<RefreshToken>("token")], [nameof<RefreshToken>("id")])
    .execute();

  return results?.raw?.length > 0;
}

/**
 * Checks if the user refresh token matches
 * @param userId - User ID
 * @param refreshToken - Refresh token
 * @returns Boolean indicating if the token matches
 */
export async function checkRefreshTokenMatches (authDetails: AuthDetails): Promise<boolean> {
  return await myDataSource.getRepository<RefreshToken>(nameof(RefreshToken))
    .existsBy({id: authDetails.id, token: authDetails.refreshToken});
}
