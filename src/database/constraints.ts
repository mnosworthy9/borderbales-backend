/**
 * Defines the constraints for the Users entity
 */
export enum UsersTableConstraints {
	PrimaryKey = "pk_users_id",
	UniqueUsername = "unq_users_username",
	UniqueEmail = "unq_users_email",
	ReputationRange = "chk_users_reputation_range"
}

/**
 * Defines the constraints for the Product entity
 */
export enum ProductTableConstraints {
	PrimaryKey = "pk_product_id",
	FKUserId = "fk_product_user_id"
}

/**
 * Defines the constraints for the ProductReview entity
 */
export enum ProductReviewTableConstraints {
	PrimaryKey = "pk_product_review_id",
	RatingRange = "chk_product_review_rating_range",
	FKProductId = "fk_product_review_product_id",
	FKUserId = "fk_product_review_user_id"
}

/**
 * Defines the constraints for the Order entity
 */
export enum OrderTableConstraints {
	PrimaryKey = "pk_order_id",
	FKUserId = "fk_order_user_id",
	FKProductId = "fk_order_product_id"
}

/**
 * Defines the constraints for the Image entity
 */
export enum ImageTableConstraints {
	PrimaryKey = "pk_image_id",
	FKProductId = "fk_image_product_id",
	FKUserId = "fk_image_user_id"
}

/**
 * Defines the constraints for the RefreshToken entity
 */
export enum RefreshTokenTableConstraints {
	PrimaryKey = "pk_refresh_token_id",
	FKUserId = "fk_refresh_token_user_id"
}

/**
 * Defines the constraints for the BankDetails entity
 */
export enum BankDetailsTableConstraints {
	PrimaryKey = "pk_bank_details_id",
	FKUserId = "fk_bank_details_user_id"
}