import jsonwebtoken from "jsonwebtoken";

import AuthModels from "src/models/interface/auth-models";

/**
 * Create access and refresh token.
 * @param userId 
 * @param isAdmin 
 * @returns 
 */
export function createTokens (userId: number, isAdmin: boolean): AuthModels.ITokens | string {

  const accessSecret: string | undefined = process.env.JWT_ACCESS_SECRET;
  const refreshSecret: string | undefined = process.env.JWT_REFRESH_SECRET;

  if(accessSecret == undefined || refreshSecret == undefined)
    return "Error Getting access/refresh secret from env variables";

  const accessToken: string = jsonwebtoken.sign({userId: userId, isAdmin: isAdmin}, accessSecret, { expiresIn: "8h" });

  const refreshToken: string = jsonwebtoken.sign({ userId: userId }, refreshSecret, { expiresIn: "30d" });

  return {accessToken: accessToken, refreshToken: refreshToken}
}

