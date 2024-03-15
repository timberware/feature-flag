import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import FlagsController from './flags.controller';
import FlagsService from './flags.service';
import { Flag, FlagSchema } from './schemas/flag.schema';
import FlagsRepository from './flags.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flag.name, schema: FlagSchema }]),
  ],
  controllers: [FlagsController],
  providers: [FlagsService, FlagsRepository],
})
export default class FlagsModule {}
