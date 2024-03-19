import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import FlagService from './flag.service';
import FlagDto from './flag.dts';
import FlagGuard from './flag.guard';
import EnableGuard from './enable.guard';

@Controller('flags')
class FlagController {
  constructor(private readonly flagsService: FlagService) {}

  @Get('/')
  @HttpCode(200)
  async getFlags(): Promise<FlagDto[]> {
    return this.flagsService.get();
  }

  @UseGuards(FlagGuard)
  @HttpCode(201)
  @Post('/')
  async saveFlag(@Body() flagRequest: FlagDto): Promise<FlagDto> {
    return this.flagsService.create(flagRequest);
  }

  @UseGuards(EnableGuard)
  @HttpCode(200)
  @Patch('/:id')
  async toggleEnabled(
    @Param('id') id: string,
    @Body() { isEnabled }: { isEnabled: boolean },
  ): Promise<FlagDto | null> {
    return this.flagsService.toggleEnabled(id, isEnabled);
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id') id: string): void {
    this.flagsService.delete(id);
  }
}

export default FlagController;
