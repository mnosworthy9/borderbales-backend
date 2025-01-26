// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Entity, PrimaryGeneratedColumn, Column, Unique, Check, CreateDateColumn,} from "typeorm";

/**
 *
 */
@Entity("users")
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 50, name: "first_name" })
    firstName?: string | null;

    @Column({ type: "varchar", length: 50, name: "last_name" })
    lastName?: string | null;

    @Column({ type: "varchar", length: 100 })
    @Unique("unq_users_username", ["username"])
    username?: string;

    @Column({ type: "varchar", length: 100 })
    @Unique("unq_users_email", ["email"])
    email!: string;

    @Column({ type: "varchar", length: 255 })
    password!: string;

    @Column({ type: "decimal", precision: 5, scale: 2, default: 100.0 })
    @Check("chk_users_reputation_range", `"reputation" >= 0.00 AND "reputation" <= 100.00`)
    reputation!: number;

    @Column({ type: "integer", default: 0 })
    sales!: number;

    @Column({ type: "boolean", default: false })
    isAdmin!: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "NOW()", name: "created_at" })
    createdAt!: Date;
}