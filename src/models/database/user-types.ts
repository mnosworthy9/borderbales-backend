import { Users } from "@database/entities/users";
import { RefreshTokenType } from "./auth-types";

/**
 * Represents the data stored in a token, derived from the Users entity.
 *
 * @property id - The unique identifier of the user.
 */
export type TokenData = Pick<Users, "id">;

/**
 * Represents the query result for user login.
 * 
 * @type LoginQuery
 * @property id The user's unique ID
 * @property password The user's password
 */
export type LoginQuery = Pick<Users, "id" | "password">;

/**
 * Represents the structure for a user authentication request (login or signup).
 * 
 * @type UserCredentials
 * @property email The email address of the user.
 * @property password The password of the user.
 */
export type UserCredentials = Pick<Users, "email" | "password">;

/**
 * Represents the structure for a user signup request.
 * 
 * @type AuthDetails
 * @property id The unique identifier of the user.
 * @property refreshToken The refresh token of the user.
 */
export type AuthDetails = Pick<Users, "id"> & RefreshTokenType;
