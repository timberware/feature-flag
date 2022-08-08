import { Module } from '@nestjs/common';
import FlagsController from './flags.controller';
import FlagsService from './flags.service';

@Module({
  imports: [],
  controllers: [FlagsController],
  providers: [FlagsService],
})
export default class FlagsModule {}
