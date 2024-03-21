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
  ParseUUIDPipe,
} from '@nestjs/common';
import FlagService from './flag.service';
import FlagDto from './flag.dts';
import FlagGuard from './flag.guard';

@Controller('flags')
class FlagController {
  constructor(private readonly flagsService: FlagService) {}

  @Get('/')
  @HttpCode(200)
  async getFlags(): Promise<FlagDto[]> {
    return this.flagsService.get();
  }

  @Get('/:id')
  @HttpCode(200)
  async getFlag(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<FlagDto> {
    console.log({ id });
    return this.flagsService.getById(id);
  }

  @UseGuards(FlagGuard)
  @HttpCode(201)
  @Post('/')
  async saveFlag(@Body() flagRequest: FlagDto): Promise<FlagDto> {
    return this.flagsService.create(flagRequest);
  }

  @HttpCode(200)
  @Patch('/:id')
  async toggleEnabled(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { isEnabled }: { isEnabled: boolean },
  ): Promise<FlagDto | null> {
    return this.flagsService.toggleEnabled(id, isEnabled);
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    this.flagsService.delete(id);
  }
}

export default FlagController;
