import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import AppController from './app.controller';
import MongoDB from './mongo/mongo.module';
import config from './config';
import AppService from './app.service';
import FlagModule from './flag/flag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MongoDB,
    FlagModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
