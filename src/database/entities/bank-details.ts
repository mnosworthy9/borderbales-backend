// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./users";

/**
 *
 */
@Entity('bank_details')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class BankDetails {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    cryptoAddress?: string;

    // Foreign Key relationship with Users table
    @ManyToOne(() => Users, user => user.banks)
    user!: Users;
}