import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Users } from "./users";
import { BankDetailsTableConstraints } from "../constraints";

/**
 *
 */
@Entity('bank_details')
export class BankDetails {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: BankDetailsTableConstraints.PrimaryKey })
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    cryptoAddress?: string;

    @ManyToOne(() => Users, user => user.banks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id', foreignKeyConstraintName: BankDetailsTableConstraints.FKUserId })
    user!: Users;
    @Column({ type: 'uuid', name: 'user_id' })
    userId!: string;
}