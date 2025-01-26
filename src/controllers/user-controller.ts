import jwt from "jsonwebtoken";
import randomString from "randomstring";

import UserModels from "./../models/interface/user-models";
import AuthModels from "src/models/interface/auth-models";
import { createTokens } from "@util/auth";
import { getUserByEmailQuery } from "@models/query/user-query";
import { upsertRefreshToken } from "@models/query/refresh-token-query";
import { signupUserQuery } from "@models/query/user-query"

const jwtSecret = (process.env.JWT_SECRET || randomString.generate(100));

/**
 * Signs up a user
 * @param credentials - email and password of the user.
 * @returns the jwt token.
 */
export async function signupUserController(credentials: UserModels.IAuthRequest): Promise<string> {
  const user: UserModels.ITokenData | string = await signupUserQuery(credentials);
  if(typeof user === "string"){
    console.error(user);
    return user; // need a more specific error here
  }

  return handleTokens(user)
}

/**
 * logs in user securely
 * @param credentials - Email and password for a user.
 * @returns true or false
 */
export async function loginUserController(credentials: UserModels.IAuthRequest): Promise<string> {

  const user: UserModels.ILoginQuery | false = await getUserByEmailQuery(credentials.email);

  if (!user) 
    return "User not found";
  
  const isValid: boolean = (credentials.password === user.password);

  if (isValid) {
    return await handleTokens(user);

  } else {
    return "Incorrect password";
  }
}

/**
 * Creates tokens and adds them to database.
 * @param user - User info to create tokens.
 * @returns A jwt for user.
 */
async function handleTokens(user: UserModels.ITokenData) {
  const tokens: AuthModels.ITokens | string = createTokens(user.id, user.isAdmin);

  if (typeof tokens === "string") {
    console.error(tokens)
    return "";
  }

  const refreshTokenUpdated: boolean = await upsertRefreshToken(user.id, tokens.refreshToken);

  if (!refreshTokenUpdated)
    return "Error updating refresh token";

  return jwt.sign(tokens, jwtSecret)
}