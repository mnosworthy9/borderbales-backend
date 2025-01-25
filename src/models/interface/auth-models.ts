
declare namespace AuthModels {

	/**
	 * the auth requested when user wants to login
	 * 
	 * @property refreshToken of user
	 * @property accessToken of user
	 */
	export interface ITokens {
	refreshToken: string,
	accessToken: string,
  }
}

export default AuthModels;