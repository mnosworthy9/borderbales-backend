// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product"; // Adjust the path based on your structure

/**
 *
 */
@Entity("image")
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Image {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Product, product => product.images)
    product!: Product;

    @Column({ type: "varchar", length: 255, nullable: true })
    url?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    bucket?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    key?: string;
}