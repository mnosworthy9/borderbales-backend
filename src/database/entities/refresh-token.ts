// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    Unique,
    OneToOne
} from "typeorm";
import { Users } from "./users"; // Adjust the import path according to your file structure

/**
 *
 */
@Entity('refresh_token')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class RefreshToken {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255})
    token?: string | null;

    @CreateDateColumn({ type: 'timestamp', default: () => "NOW()" })
    createdAt!: Date;

    @OneToOne(() => Users, user => user.refreshToken)
    user!: Users;
}
