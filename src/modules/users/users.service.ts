import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dtos/registerDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async createUser(registerDto : RegisterDto): Promise<UserEntity> {
        const user: UserEntity = new UserEntity();
        user.email = registerDto.email;
        user.username = registerDto.username;
        user.password = await bcrypt.hash(registerDto.password, 10);
        user.role = 1; // mean this is a user
        return await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ id });
    }

    async updateUser(id: number, user: UserEntity, updateBy: string): Promise<UserEntity> {
        user.updatedBy = updateBy;
        user.updatedAt = new Date();
        await this.userRepository.update(id, user);
        return await this.userRepository.findOneBy({ id });
    }

    async optionDeleteUser(id: number, isDeleted: boolean, deletedby :string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({ id });
        user.deleted = isDeleted ;
        user.deletedBy = deletedby;
        user.deletedAt = new Date();
        await this.userRepository.update(id, user);
        return user;
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ email });
    }

}
