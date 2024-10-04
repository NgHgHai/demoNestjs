import { UserEntity } from 'src/common/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchErrService } from 'src/utils/error.util';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
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

  async save(user: UserEntity): Promise<UserEntity> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      catchErrService('AuthService.save', error);
    }
  }
}
