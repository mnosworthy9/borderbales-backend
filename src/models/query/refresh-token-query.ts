import { myDataSource } from "src/database/app-data-source";
import { nameof } from "@util/functions";
import { RefreshToken } from "src/database/entities/refresh-token";
import { AuthDetails } from "@models/database/user-types";
import { Users } from "@database/entities/users";

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
    .values({ [nameof<RefreshToken>("id")]: authDetails.id, [nameof<RefreshToken>("token")]: authDetails.token })
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
    .findOneBy({[nameof<RefreshToken>("id")]: authDetails.id, [nameof<RefreshToken>("token")]: authDetails.token}) !== null;
}

/**
 * Deletes the refresh token from the database
 * @param userId - User ID
 * @returns Boolean indicating if the token was deleted
 */
export async function deleteRefreshToken (userId: Users["id"]): Promise<void> {
  await myDataSource.getRepository<RefreshToken>(nameof(RefreshToken))
    .delete({ [nameof<RefreshToken>("id")]: userId });
}
