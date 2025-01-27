// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check, CreateDateColumn, JoinColumn } from "typeorm";
import { Product } from "./product";
import { Users } from "./users";
import Constraints from "../constraints";
import { nameof } from "@util/functions";

/**
 *
 */
@Entity("product_review")
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ProductReview {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: Constraints.ProductReview.PrimaryKey })
    id!: number;
    
    @Check(Constraints.ProductReview.RatingRange, nameof<ProductReview>("rating") + " >= 0 AND " + nameof<ProductReview>("rating") + " <= 5")
    @Column({ type: "int" })
    rating!: number;
    
    @Column({ type: "varchar", length: 1000 })
    review?: string;
    
    @CreateDateColumn({ type: "date", name: "created_at" })
    createdAt?: Date;
    
    @ManyToOne(() => Product, product => product.reviews, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id", foreignKeyConstraintName: Constraints.ProductReview.FKProductId })
    product!: Product;
    @Column({ type: "int", name: "product_id" })
    productId!: number;

    @ManyToOne(() => Users, user => user.productReviews, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "user_id", foreignKeyConstraintName: Constraints.ProductReview.FKUserId })
    user?: Users;
    @Column({ type: "uuid", name: "user_id", nullable: true })
    userId?: string;
}