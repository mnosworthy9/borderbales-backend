// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, PrimaryGeneratedColumn, Column, Unique, Check, CreateDateColumn, OneToOne, OneToMany } from "typeorm";
import { RefreshToken } from "./refresh-token";
import { Product } from "./product";
import { ProductReview } from "./product-review";
import { Order } from "./order";
import Constraints from "../constraints";
import { BankDetails } from "./bank-details";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { Image } from "./image";

/**
 * Defines the Users entity
 */
@Entity("users")
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Users {
    @PrimaryGeneratedColumn( "uuid", { primaryKeyConstraintName: Constraints.Users.PrimaryKey })
    id!: UUID;

    @Column({ type: "varchar", length: 50, name: "first_name", nullable: true })
    firstName?: string;

    @Column({ type: "varchar", length: 50, name: "last_name", nullable: true })
    lastName?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    @Unique(Constraints.Users.UniqueUsername, ["username"])
    username?: string;

    @Column({ type: "varchar", length: 100 })
    @Unique(Constraints.Users.UniqueEmail, ["email"])
    email!: string;

    @Column({ type: "varchar", length: 255 })
    password!: string;

    @Column({ type: "decimal", precision: 5, scale: 2, default: 100.0 })
    @Check(Constraints.Users.ReputationRange, `"reputation" >= 0.00 AND "reputation" <= 100.00`)
    reputation!: number;

    @Column({ type: "integer", default: 0 })
    sales?: number;

    @Column({ type: "boolean", default: false, name: "is_admin" })
    isAdmin?: boolean;

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