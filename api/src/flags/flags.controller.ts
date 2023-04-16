import { Body, Controller, Get, Post, Patch, UseGuards } from '@nestjs/common';
import FlagsService from './flags.service';
import FlagDto from './flag.dts';
import FlagGuard from './flag.guard';
import EnableGuard from './enable.guard';

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

  @UseGuards(EnableGuard)
  @Patch('setEnabled')
  async setEnabled(
    @Body() { id, isEnabled }: { id: string; isEnabled: boolean },
  ): Promise<FlagDto | null> {
    return this.flagsService.setEnabled({ id, isEnabled });
  }
}

export default FlagsController;
