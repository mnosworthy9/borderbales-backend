/**
 * User login reponse type for the front end.
 * 
 * @type UserLoginResponse
 * @property accessToken Access token to be sent to the front end.
 * @property refreshToken Refresh token to be sent to the front end and database.
 */
export type UserLoginResponse = {
	accessToken: string;
	refreshToken: string;
}

