import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { catchErrService } from 'src/utils/error.util';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }
    async updateUser(user: UserEntity): Promise<UserEntity> {
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            catchErrService('UsersService.updateUser', error);
        }

    }
    async getUserById(id: any): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id,
                    deleted: false,
                },
            });
            return user;
        } catch (error) {
            catchErrService('UsersService.getUserById', error);
        }

    }


}
