import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check, CreateDateColumn, JoinColumn } from "typeorm";
import { Product } from "./product";
import { Users } from "./users";
import { nameof } from "@util/functions";
import { ProductReviewTableConstraints } from "../constraints";

/**
 *
 */
@Entity("product_review")
export class ProductReview {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: ProductReviewTableConstraints.PrimaryKey })
    id!: number;
    
    @Check(ProductReviewTableConstraints.RatingRange, nameof<ProductReview>("rating") + " >= 0 AND " + nameof<ProductReview>("rating") + " <= 5")
    @Column({ type: "int" })
    rating!: number;
    
    @Column({ type: "varchar", length: 1000 })
    review?: string;
    
    @CreateDateColumn({ type: "date", name: "created_at" })
    createdAt?: Date;
    
    @ManyToOne(() => Product, product => product.reviews, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id", foreignKeyConstraintName: ProductReviewTableConstraints.FKProductId })
    product!: Product;
    @Column({ type: "int", name: "product_id" })
    productId!: number;

    @ManyToOne(() => Users, user => user.productReviews, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "user_id", foreignKeyConstraintName: ProductReviewTableConstraints.FKUserId })
    user?: Users;
    @Column({ type: "uuid", name: "user_id", nullable: true })
    userId?: string;
}