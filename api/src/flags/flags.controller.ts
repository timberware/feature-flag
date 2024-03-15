import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import FlagsService from './flags.service';
import FlagDto from './flag.dts';
import FlagGuard from './flag.guard';
import EnableGuard from './enable.guard';

@Controller('flags')
class FlagsController {
  constructor(private readonly flagsService: FlagsService) {}

  @Get('/')
  async getFlags(): Promise<FlagDto[]> {
    return this.flagsService.get();
  }

  @UseGuards(FlagGuard)
  @Post('/')
  async saveFlag(@Body() flagRequest: FlagDto): Promise<FlagDto> {
    return this.flagsService.create(flagRequest);
  }

  @UseGuards(EnableGuard)
  @Patch('/:id')
  async toggleEnabled(
    @Param('id') id: string,
    @Body() { isEnabled }: { isEnabled: boolean },
  ): Promise<FlagDto | null> {
    return this.flagsService.toggleEnabled(id, isEnabled);
  }

  @UseGuards(EnableGuard)
  @Delete('/:id')
  delete(@Param('id') id: string): void {
    this.flagsService.delete(id);
  }
}

export default FlagsController;
