// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product"; // Adjust the path based on your structure
import Constraints from "../constraints";
import { Users } from "./users";

/**
 *
 */
@Entity("image")
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Image {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: Constraints.Image.PrimaryKey })
    id!: number;
    
    @Column({ type: "varchar", length: 255, nullable: true })
    url?: string;
    
    @Column({ type: "varchar", length: 255, nullable: true })
    bucket?: string;
    
    @Column({ type: "varchar", length: 255, nullable: true })
    key?: string;
    
    @ManyToOne(() => Product, product => product.images, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id", foreignKeyConstraintName: Constraints.Image.FKProductId })
    product?: Product;
    @Column({ type: "int", nullable: true, name: "product_id" })
    productId?: number;

    @ManyToOne(() => Users, user => user.images, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id", foreignKeyConstraintName: Constraints.Image.FKUserId })
    user?: Users;
    @Column({ type: "uuid", nullable: true, name: "user_id" })
    userId?: string;
}