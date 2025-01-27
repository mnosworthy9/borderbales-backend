import {
    Entity,
    Column,
    CreateDateColumn,
    OneToOne,
    PrimaryColumn,
    JoinColumn
} from "typeorm";
import { Users } from "./users"; // Adjust the import path according to your file structure
import { RefreshTokenTableConstraints } from "../constraints";

/**
 *
 */
@Entity('refresh_token')
export class RefreshToken {

    @PrimaryColumn("uuid", { primaryKeyConstraintName: RefreshTokenTableConstraints.PrimaryKey })
    id!: string;
    
    @Column({ type: 'varchar', length: 512, nullable: true})
    token!: string;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;
    
    @OneToOne(() => Users, user => user.refreshToken, { onDelete: 'CASCADE' })
    @JoinColumn( { name: 'id', foreignKeyConstraintName: RefreshTokenTableConstraints.FKUserId })
    user!: Users;
}
