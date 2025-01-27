// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Users } from "./users";
import Constraints from "../constraints";

/**
 *
 */
@Entity('bank_details')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class BankDetails {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: Constraints.BankDetails.PrimaryKey })
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    cryptoAddress?: string;

    @ManyToOne(() => Users, user => user.banks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id', foreignKeyConstraintName: Constraints.BankDetails.FKUserId })
    user!: Users;
    @Column({ type: 'uuid', name: 'user_id' })
    userId!: string;
}