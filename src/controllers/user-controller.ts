import jwt from "jsonwebtoken";
import randomString from "randomstring";

import UserModels from "./../models/interface/user-models";
import AuthModels from "src/models/interface/auth-models";

import UserQuery from "./../models/query/user-query";
import RefreshQuery from "./../models/query/refresh-token-query";
import Auth from "@util/auth";

const jwtSecret = (process.env.JWT_SECRET || randomString.generate(100));

/**
 * Signs up a user
 * @param credentials - email and password of the user.
 * @returns the jwt token.
 */
async function signup(credentials: UserModels.IAuthRequest): Promise<string> {
  const user: UserModels.ITokenInfo | string = await UserQuery.signup(credentials);
  if(typeof user === "string"){
    console.error(user);
    return user; // need a more specific error here
  }

  return handleTokens(user)
}

/**
 * Creates tokens and adds them to database.
 * @param user - User info to create tokens.
 * @returns A jwt for user.
 */
async function handleTokens(user: UserModels.ITokenInfo) {
  const tokens: AuthModels.ITokens | string = Auth.createTokens(user.id, user.is_admin);

  if (typeof tokens === "string") {
    console.error(tokens)
    return "";
  }

  const refreshTokenUpdated: boolean = await RefreshQuery.upsert(user.id, tokens.refreshToken);

  if (!refreshTokenUpdated)
    return "Error updating refresh token";

  return jwt.sign(tokens, jwtSecret)
}

/**
 * logs in user securely
 * @param credentials - Email and password for a user.
 * @returns true or false
 */
async function login(credentials: UserModels.IAuthRequest): Promise<string> {

  const user: UserModels.ILoginQuery | false = await UserQuery.getUserByEmail(credentials.email);

  if (!user) 
    return "User not found";
  
  const isValid: boolean = (credentials.password === user.password);

  if (isValid) {
    return await handleTokens(user);

  } else {
    return "Incorrect password";
  }
}


export default {
  signup,
  login
} as const;
