import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import FlagsService from './flags.service';
import FlagDto from './flag.dts';
import FlagGuard from './flag.guard';

@Controller('flags')
class FlagsController {
  constructor(private readonly flagsService: FlagsService) {}

  @Get('getFlags')
  async getFlags(): Promise<FlagDto[]> {
    return this.flagsService.findAll();
  }

  @UseGuards(FlagGuard)
  @Post('saveFlag')
  async saveFlag(@Body() flagRequest: FlagDto): Promise<FlagDto> {
    return this.flagsService.saveFlag(flagRequest);
  }
}

export default FlagsController;
