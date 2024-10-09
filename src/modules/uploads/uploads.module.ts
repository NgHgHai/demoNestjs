import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerFactory } from 'src/common/factories/multer.factory';
import { TodoModule } from '../todo/todo.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TodoModule,UsersModule,
    
    MulterModule.registerAsync({
    imports: [],
    useFactory: multerFactory,
    inject: []
  })
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule { }
