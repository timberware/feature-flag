import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppController from './app.controller';
import config from './config';
import AppService from './app.service';
import FlagsModule from './flags/flags.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] }), FlagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
