import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  Param,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import FlagService from './flag.service';
import FlagDto from './flag.dts';
import QueryDto from './query.dts';
import FlagGuard from './flag.guard';

@Controller('flags')
class FlagController {
  constructor(private readonly flagsService: FlagService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getFlags(@Query() query: QueryDto): Promise<FlagDto[]> {
    return this.flagsService.get(query);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getFlag(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<FlagDto> {
    console.log({ id });
    return this.flagsService.getById(id);
  }

  @UseGuards(FlagGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async saveFlag(@Body() flagRequest: FlagDto): Promise<FlagDto> {
    return this.flagsService.create(flagRequest);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  async toggleEnabled(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { isEnabled }: { isEnabled: boolean },
  ): Promise<FlagDto | null> {
    return this.flagsService.toggleEnabled(id, isEnabled);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    this.flagsService.delete(id);
  }
}

export default FlagController;
