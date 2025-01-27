// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
    Entity,
    Column,
    CreateDateColumn,
    OneToOne,
    PrimaryColumn,
    JoinColumn
} from "typeorm";
import { Users } from "./users"; // Adjust the import path according to your file structure
import Constraints from "../constraints";

/**
 *
 */
@Entity('refresh_token')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class RefreshToken {

    @PrimaryColumn("uuid", { primaryKeyConstraintName: Constraints.RefreshToken.PrimaryKey })
    id!: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true})
    token!: string;
    
    @CreateDateColumn({ type: 'timestamp', default: () => "NOW()" })
    createdAt?: Date;
    
    @OneToOne(() => Users, user => user.refreshToken, { onDelete: 'CASCADE' })
    @JoinColumn( { name: 'id', foreignKeyConstraintName: Constraints.RefreshToken.FKUserId })
    user!: Users;
}
