import { nameof } from "@util/functions";
import { myDataSource } from "../../database/app-data-source";
import { Users } from "../../database/entities/users";
import { UserCredentials, LoginQuery } from "@models/database/user-types";
/**
 * Get user details by email.
 * @param email - Email of the user.
 * @returns - Details of the user to make tokens or false if the user does not exist.
 */
export async function getUserByEmailQuery (email: Users["email"]): Promise<LoginQuery | false> {
  return await myDataSource.getRepository<Users>(nameof(Users))
  .createQueryBuilder()
  .select([nameof<Users>("id"), nameof<Users>("password")])
  .where({ email: email })
  .getOne() ?? false;
}

/**
 * signup user.
 * @param credentials emails and password for user.
 * @returns the user id and if the user is an admin.
 * @throws {Users} error if the email already exists.
 */
export async function signupUserQuery (credentials: UserCredentials): Promise<Users["id"]> {
  return await myDataSource.getRepository<Users>(nameof(Users))
    .createQueryBuilder()
    .insert()
    .values({ email: credentials.email, password: credentials.password })
    .returning([nameof<Users>("id")])
    .execute()
    .then(result => result.raw[0]);
}

/**
 * @function exists - check if the user exists based on email
 * @param email - email of user
 * @returns true if the users email exists.
 */
export async function checkUserExistsQuery (email: Users["email"]): Promise<boolean> {
  return await myDataSource.getRepository<Users>(nameof(Users))
    .existsBy({ email: email });
}
