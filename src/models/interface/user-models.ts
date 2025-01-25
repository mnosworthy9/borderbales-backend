/**
 * User-related queries and data models.
 * 
 * @namespace UserModels
 * @description Contains interfaces and types for user-related operations
 */
declare namespace UserModels{

  /**
   * Represents all variables in the user object.
   * 
   * @interface IUser
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
   * 
   * @property email email of user
   * @property password password of user
   */
  interface ITokenInfo {
    id: number,
    is_admin: boolean
  }
    
  /**
   * Represents the query result for user login.
   * 
   * @interface ILoginQuery
   * @property id The user's unique ID
   * @property password The user's password
   * @property is_admin Indicates if the user is an admin
   */
  interface ILoginQuery {
    id: number;
    password: string;
    is_admin: boolean;
  }

  /**
   * User login request from the front end.
   * 
   * @interface ILoginRequest
   * @property accessToken Access token to be sent to the front end.
   * @property refreshToken Refresh token to be sent to the front end and database.
   * @property is_admin Determine if the user is an admin.
   */
  interface ILoginRequest {
    accessToken: string;
    refreshToken: string;
    is_admin: boolean;
  }

  /**
   * Represents the structure for a user authentication request (login or signup).
   * 
   * @interface IAuthRequest
   * @property email The email address of the user.
   * @property password The password of the user.
   */
  export interface IAuthRequest {
    email: string;
    password: string;
  }
}
  
export default UserModels;