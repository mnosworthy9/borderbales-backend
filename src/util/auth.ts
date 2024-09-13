import jwt from "jsonwebtoken";
import { ITokens } from "./../controllers/user-controller";

/**
 * 
 * @param userId 
 * @param isAdmin 
 * @returns 
 */
export const CreateRefreshAndAccessToken = (userId: number, isAdmin: boolean): ITokens | string => {

  const accessSecret: string | undefined = process.env.JWT_ACCESS_SECRET;
  const refreshSecret: string | undefined = process.env.JWT_REFRESH_SECRET;

  if(accessSecret == undefined || refreshSecret == undefined)
    return "Error Getting access/refresh secret from env variables";

  const accessToken: string = jwt.sign({userId: userId, isAdmin: isAdmin}, accessSecret, { expiresIn: "8h" });

  const refreshToken: string = jwt.sign({ userId: userId }, refreshSecret, { expiresIn: "30d" });

  return {accessToken: accessToken, refreshToken: refreshToken}
}