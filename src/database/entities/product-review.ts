// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check, CreateDateColumn } from "typeorm";
import { Product } from "./product";
import { Users } from "./users";

/**
 *
 */
@Entity("product_review")
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ProductReview {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @ManyToOne(() => Product, product => product.reviews)
    product!: Product;

    @ManyToOne(() => Users, user => user.productReviews)
    user!: Users;

    @Check("chk_product_review_rating", `"rating" >= 0 AND "rating" <= 5`)
    @Column({ type: "int" })
    rating!: number;

    @Column({ type: "varchar", length: 1000 })
    review?: string;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    createdAt!: Date;
}