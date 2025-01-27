import { Entity, PrimaryGeneratedColumn, Column, Unique, Check, CreateDateColumn, OneToOne, OneToMany } from "typeorm";
import { RefreshToken } from "./refresh-token";
import { Product } from "./product";
import { ProductReview } from "./product-review";
import { Order } from "./order";
import { BankDetails } from "./bank-details";
import { Image } from "./image";
import { UsersTableConstraints } from "../constraints";

/**
 * Defines the Users entity
 */
@Entity("users")
export class Users {
    @PrimaryGeneratedColumn( "uuid", { primaryKeyConstraintName: UsersTableConstraints.PrimaryKey })
    id!: string;

    @Column({ type: "varchar", length: 50, name: "first_name", nullable: true })
    firstName?: string;

    @Column({ type: "varchar", length: 50, name: "last_name", nullable: true })
    lastName?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    @Unique(UsersTableConstraints.UniqueUsername, ["username"])
    username?: string;

    @Column({ type: "varchar", length: 100 })
    @Unique(UsersTableConstraints.UniqueEmail, ["email"])
    email!: string;

    @Column({ type: "varchar", length: 255 })
    password!: string;

    @Column({ type: "decimal", precision: 5, scale: 2, default: 100.0 })
    @Check(UsersTableConstraints.ReputationRange, `"reputation" >= 0.00 AND "reputation" <= 100.00`)
    reputation!: number;

    @Column({ type: "integer", default: 0 })
    sales?: number;

    @CreateDateColumn({ type: "timestamp", default: () => "NOW()", name: "created_at" })
    createdAt?: Date;

    @OneToOne(() => RefreshToken, refreshToken => refreshToken.user)
    refreshToken?: RefreshToken;

    @OneToMany(() => Product, product => product.user)
    products?: Product[];

    @OneToMany(() => ProductReview, productReview => productReview.user)
    productReviews?: ProductReview[];

    @OneToMany(() => Order, order => order.user)
    orders?: Order[];

    @OneToMany(() => BankDetails, bank => bank.user)
    banks?: BankDetails;

    @OneToMany(() => Image, image => image.user)
    images?: Image[];
}