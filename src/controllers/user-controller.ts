import UserQuery from "src/models/query/user-query";
import RefreshQuery from "src/models/query/refresh-token-query";
import jwt from "jsonwebtoken";
import randomString from "randomstring";

import UserModels from "src/models/interface/user-models";
import { CreateRefreshAndAccessToken } from "@util/auth";

const jwtSecret = (process.env.JWT_SECRET || randomString.generate(100));

/**
 * @function signupUser :async - signup user
 * @param {string} email email of user
 * @param {string} password password of user
 * @returns {Promise<true | string>} Promise<true | string>
 */
async function signupUser(email: string, password: string): Promise<string> {

  const user: UserModels.IUserSignupQuery | string = await UserQuery.signupUser(email, password);
  if(typeof user === "string"){
    console.error(user);
    return user; // need a more specific error here
  }

  const tokens: ITokens | string = CreateRefreshAndAccessToken(user.id, user.is_admin);

    if(typeof tokens === "string"){
      console.error(tokens)
      return "";
    }

    const refreshTokenUpdated: boolean = await RefreshQuery.insertRefreshToken(user.id, tokens.refreshToken);

    if(!refreshTokenUpdated)
      return "Error updating refresh token";
  
    return jwt.sign(tokens, jwtSecret)
}

/**
 * the auth requested when user wants to login
 */
export interface ITokens {
  refreshToken: string,
  accessToken: string,
}

/**
 * logs in user securley
 * @param email front end validated email address
 * @param password front end validated password
 * @returns true or false
 */
async function loginUser(email: string, password: string): Promise<string> {

  const user: UserModels.IUserLoginQuery | false = await UserQuery.getUserByEmail(email);

  if (!user) 
    return "User not found";
  
  const isValid: boolean = (password === user.password);

  if (isValid) {
    const tokens: ITokens | string = CreateRefreshAndAccessToken(user.id, user.is_admin);

    if(typeof tokens === "string"){
      console.error(tokens)
      return "";
    }

    const refreshTokenUpdated: boolean = await RefreshQuery.insertRefreshToken(user.id, tokens.refreshToken);

    if(!refreshTokenUpdated)
      return "Error updating refresh token";
  
    return jwt.sign(tokens, jwtSecret)
   
  } else {
    return "Incorrect password";
  }
}


export default {
  signupUser,
  loginUser
} as const;
