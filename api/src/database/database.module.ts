import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO } from '../config';

const { HOST, USER, PASS, DB } = MONGO;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${HOST}`, {
      dbName: DB,
      user: USER,
      pass: PASS,
    }),
  ],
})
export default class DatabaseModule {}
