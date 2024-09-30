import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './configs/db/DatabaseModule';

@Module({
  imports: [AuthModule,DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
