// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, Check, CreateDateColumn } from "typeorm";
import { Users } from "./users"; // Adjust path as per your directory structure
import { Product } from "./product"; // Adjust path as per your directory structure

/**
 *
 */
@Entity("order")
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Users, user => user.orders)
    user!: Users;

    @ManyToOne(() => Product, product => product.orders)
    product?: Product;

    @Column({ type: "int" })
    quantity!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;

    @CreateDateColumn({ type: "timestamp", default: () => "NOW()", name: "order_time" })
    orderTime!: Date;
}