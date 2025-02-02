import { RefreshToken } from "@database/entities/refresh-token";

/**
 * 
 */
export type RefreshTokenType = Pick<RefreshToken, "token">;
