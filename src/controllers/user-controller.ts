import bcrypt from "bcrypt";
import UserQuery from "src/models/query/user-query";
import RefreshQuery from "src/models/query/refresh-token-query";
import jwt from "jsonwebtoken";
import randomString from "randomstring";
import UserModels from "src/models/interface/user-models";

const refreshSecret = (process.env.JWT_REFRESH_SECRET || randomString.generate(100));
const accessSecret = (process.env.JWT_ACCESS_SECRET || randomString.generate(100));

/**
 * @function signupUser :async - signup user
 * @param {string} email:string - email of user
 * @param {string} password:string - password of user
 * @returns {Promise<true | string>} Promise<true | string>
 */
async function signupUser(email: string, password: string): Promise<true | string> {

  const exists: boolean = await UserQuery.userExists(email);

  if (exists) {
    return "User already exists";
  }
  
  const pwdHashed: string = await bcrypt.hash(password, 10);

  const id = await UserQuery.signupUser(email, pwdHashed);

  if(!id) {
    return "Error signing up user";
  }

  return true;
}



/**
 * logs in user securley
 * @param email front end validated email address
 * @param password front end validated password
 * @returns true or false
 */
async function loginUser(email: string, password: string): Promise<string | UserModels.IUserLoginRequest> {

  const user: UserModels.IUserLoginQuery | false = await UserQuery.getUserByEmail(email);

  if (!user) {
    return "User not found";
  }
  
  const isValid: boolean = await bcrypt.compare(password, user.password);

  if (isValid) {
    const accessToken: string = jwt.sign({
      id: user.id, email: email, is_admin: user.is_admin, hashPass: user.password
    }, accessSecret, { expiresIn: "1h" });
    const refreshToken: string = jwt.sign({ id: user.id }, refreshSecret, { expiresIn: "30d" });

    const refreshTokenUpdated: boolean = await RefreshQuery.insertRefreshToken(user.id, refreshToken);

    if(!refreshTokenUpdated) {
      return "Error updating refresh token";
    }

    return {
      accessToken,
      refreshToken,
      is_admin: user.is_admin
    };
  } else {
    return "Incorrect password";
  }
}

export default {
  signupUser,
  loginUser
} as const;
