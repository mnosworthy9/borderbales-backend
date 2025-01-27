import { AuthDetails } from "@models/database/user-types";
import { AuthTokens } from "@models/interface/auth-models";
import { checkRefreshTokenMatches } from "@models/query/refresh-token-query";
import jsonwebtoken from "jsonwebtoken";
import { Users } from "src/database/entities/users";

/**
 * Create access and refresh token.
 * @param userId 
 * @returns 
 */
export function createTokens (userId: Users["id"]): AuthTokens {

  const accessSecret: string | undefined = process.env.JWT_ACCESS_SECRET;
  const refreshSecret: string | undefined = process.env.JWT_REFRESH_SECRET;

  if(accessSecret == undefined || refreshSecret == undefined)
    throw new Error("JWT secret not found");

  const accessToken: string = jsonwebtoken.sign({ userId: userId }, accessSecret, { expiresIn: "8h" });

  const refreshToken: string = jsonwebtoken.sign({ userId: userId }, refreshSecret, { expiresIn: "30d" });

  return {accessToken: accessToken, refreshToken: refreshToken}
}

export async function verifyRefreshToken (authDetails: AuthDetails): Promise<boolean | string> {
  try {
    jsonwebtoken.verify(authDetails.refreshToken, process.env.JWT_REFRESH_SECRET || "");
    return await checkRefreshTokenMatches(authDetails);

  } catch (error) {
    return error.message;
  }
}

