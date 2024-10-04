import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './configs/db/DatabaseModule';
import { RolesGuard } from './common/guards/roles.guard';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './common/constants/filters/http-exception.filter';
import { PublicResourceGuard } from './common/guards/publicResource.guard';
import { TodoModule } from './modules/todo/todo.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, DatabaseModule, TodoModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PublicResourceGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      inject: [],
      useFactory: () => new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    }
  ],
})
export class AppModule { }
