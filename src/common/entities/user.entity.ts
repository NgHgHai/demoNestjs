//TODO: delete if not needed
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity({ name: 'Users' })
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Column({ name: 'username', type: 'varchar', length: 50, nullable: false})
    username: string;

    @Column({ name: 'email', type: 'varchar', length: 50, nullable: false,unique: true })
    email: string;

    @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ name: 'role', type: 'int', nullable: false })
    role: number;
    
    @Column({ name: 'isActive', type: 'bit', default: true })
    isActive: boolean;
    
    @Column({ name: 'isVerified', type: 'bit', default: false })
    isVerified: boolean;
    
}