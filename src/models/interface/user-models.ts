/**
 * queries relating to users 
 * @param {interface} IUser - all variables in the user object
 * @param {interface} IUserLoginQuery - Query result for user login
 * @param {interface} IUserLoginRequest - User login request from front end
 */
declare namespace UserModels{

  /**
   * all variables in the user object
   * @interface IUser
   * @param {number | undefined} id:number | undefined - user id
   * @param {string | undefined} first_name:string | undefined - user first name
   * @param {string | undefined} last_name:string | undefined - user last name
   * @param {string | undefined} username:string | undefined - user username
   * @param {string | undefined} email:string | undefined - user email
   * @param {string | undefined} password:string | undefined - user password
   * @param {number | undefined} reputation:number | undefined - user reputation
   * @param {number | undefined} sales:number | undefined - user sales
   * @param {boolean | undefined} is_admin:boolean | undefined - user is admin
   * @param {Date | undefined} created_at:Date | undefined - user created at
   */
  interface IUser {
    id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    password?: string;
    reputation?: number;
    sales?: number;
    is_admin?: boolean;
    created_at?: Date;
  }

  /**
   * signs up a user
   */
  interface IUserSignupQuery {
    id: number,
    is_admin: boolean
  }
  
  /**
   * Query result for user login
   * @interface IUserLoginQuery
   * @param {number} id:number - user id
   * @param {string} password:string - user password
   * @param {boolean} is_admin:boolean - user is admin
   */
  interface IUserLoginQuery {
    id: number;
    password: string;
    is_admin: boolean;
  }

  /**
   * User login request from front end
   * @interface IUserLoginRequest
   * @param {string} accessToken: string - access token to be sent to front end
   * @param {string} refreshToken: string - refresh token to be sent to front end and db
   * @param {boolean} is_admin: boolean - determine if user is an admin
   */
  interface IUserLoginRequest {
    accessToken: string;
    refreshToken: string;
    is_admin: boolean;
  }
}
  
export default UserModels;