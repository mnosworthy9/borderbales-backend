import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn } from "typeorm";
import { Users } from "./users"; // Adjust path as per your directory structure
import { Product } from "./product"; // Adjust path as per your directory structure
import { OrderTableConstraints } from "../constraints";

/**
 *
 */
@Entity("order")
export class Order {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: OrderTableConstraints.PrimaryKey })
    id!: number;

    @Column({ type: "int" })
    quantity!: number;
    
    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;
    
    @CreateDateColumn({ type: "timestamp", name: "order_time" })
    orderTime?: Date;

    @ManyToOne(() => Users, user => user.orders, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id", foreignKeyConstraintName: OrderTableConstraints.FKUserId })
    user!: Users;
    @Column({ type: "uuid", name: "user_id" })
    userId!: string;
    
    @ManyToOne(() => Product, product => product.orders, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id", foreignKeyConstraintName: OrderTableConstraints.FKProductId })
    product!: Product;
    @Column({ type: "int", name: "product_id" })
    productId!: number;
}