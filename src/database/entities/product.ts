// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Users } from "./users";
import {ProductReview} from "./product-review";
import {Order} from "./order";
import {Image} from "./image";
import Constraints from "../constraints";

/**
 *
 */
@Entity('product')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Product {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: Constraints.Product.PrimaryKey })
    id!: number;

    @Column({ type: 'varchar', length: 100})
    name!: string;
    
    @Column({ type: 'decimal', precision: 10, scale: 2})
    price!: number;
    
    @Column({ type: 'varchar', length: 1000, nullable: true })
    description?: string;
    
    @Column({ type: 'int', default: 0})
    stock!: number;
    
    @Column({ type: 'boolean', default: false})
    has_image!: boolean;
    
    @ManyToOne(() => Users, user => user.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id', foreignKeyConstraintName: Constraints.Product.FKUserId })
    user!: Users;
    @Column({ type: 'uuid', name: 'user_id' })
    userId!: string;
    
    @OneToMany(() => ProductReview, review => review.product)
    reviews!: ProductReview[];
    
    @OneToMany(() => Order, order => order.product)
    orders!: Order[];

    @OneToMany(() => Image, image => image.product)
    images!: Image[];
}
