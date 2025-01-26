// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check } from "typeorm";
import { Users } from "./users"; // Adjust the path according to your file structure

/**
 *
 */
@Entity('product')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Product {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => Users, user => user.products)
    user!: Users;

    @Column({ type: 'varchar', length: 100})
    name!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    price!: number;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    description?: string;

    @Column({ type: 'int', default: 1})
    stock!: number;

    @Column({ type: 'boolean', default: false})
    has_image!: boolean;
}
