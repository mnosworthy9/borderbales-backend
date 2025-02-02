import jwt from "jsonwebtoken";
import randomString from "randomstring";

import { createTokens } from "@util/auth";
import { getUserByEmailQuery } from "@models/query/user-query";
import { deleteRefreshToken, upsertRefreshToken } from "@models/query/refresh-token-query";
import { signupUserQuery } from "@models/query/user-query"
import { Users } from "src/database/entities/users";
import { UserCredentials, LoginQuery } from "@models/database/user-types";
import { AuthTokens } from "@models/interface/auth-models";

const jwtSecret = (process.env.JWT_SECRET || randomString.generate(100));

/**
 * Signs up a user
 * @param credentials - email and password of the user.
 * @returns the jwt token.
 */
export async function signupUserController(credentials: UserCredentials): Promise<string> {
  const userId: Users["id"] | string = await signupUserQuery(credentials);

  const tokens: AuthTokens | string = createTokens(userId);

  const refreshTokenUpdated: boolean = await upsertRefreshToken({id: userId, token: tokens.refreshToken});

  if (!refreshTokenUpdated)
    return "Error updating refresh token";

  return jwt.sign(tokens, jwtSecret)
}

/**
 * logs in user securely
 * @param credentials - Email and password for a user.
 * @returns true or false
 */
export async function loginUserController(credentials: UserCredentials): Promise<string> {

  const user: LoginQuery | false = await getUserByEmailQuery(credentials.email);

  if (!user) 
    return "User not found";

  if (credentials.password !== user.password) 
    return "Incorrect password";

  const tokens: AuthTokens = createTokens(user.id);

  const refreshTokenUpdated: boolean = await upsertRefreshToken({id: user.id, token: tokens.refreshToken});

  if (!refreshTokenUpdated)
    return "Error updating refresh token";

  return jwt.sign(tokens, jwtSecret)
}

export async function logoutUserController(userId: Users["id"]): Promise<void> {
  await deleteRefreshToken(userId);
}