import { Controller, Get } from '@nestjs/common';
import FlagsService from './flags.service';

@Controller('flags')
class FlagsController {
  constructor(private readonly flagsService: FlagsService) {}

  @Get()
  getHello(): string {
    return this.flagsService.getHello();
  }
}

export default FlagsController;
