import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppController from './app.controller';
import DatabaseModule from './database/database.module';
import config from './config';
import AppService from './app.service';
import FlagModule from './flag/flag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    DatabaseModule,
    FlagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
