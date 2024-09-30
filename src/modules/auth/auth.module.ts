import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [UsersModule,JwtModule.register({
    global: true,
    secret: 'secretKey', //TODO: e nên để secret key trong file env
  })
  ],
  providers: [AuthService],
})
export class AuthModule {}
