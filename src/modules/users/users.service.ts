import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { catchErrService } from 'src/utils/error.util';

@Injectable()
export class UsersService {
    async saveUser(newUser: UserEntity) : Promise<UserEntity> {
        try {
            return await this.userRepository.save(newUser);
        } catch (error) {
            catchErrService('UsersService.saveUser', error);
        }
    }
    hello() {
        console.log('hello==============================');
        return 'hello';
    }
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async getUserByEmail(email: string): Promise<UserEntity> {
        try {
          const user = await this.userRepository.findOne({
            where: {
              email: email,
              deleted: false,
            },
          });
    
          return user;
        } catch (error) {
          catchErrService('AuthService.getUserByUsername', error);
        }
      }

    async updateUser(user: UserEntity): Promise<UserEntity> {
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            catchErrService('UsersService.updateUser', error);
        }

    }
    async getAll(): Promise<UserEntity[]> {
        try {
            const users = await this.userRepository.find({
                where: {
                    deleted: false,
                },
            });
            return users;
        } catch (error) {
            catchErrService('UsersService.getAll', error);
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
