import { Injectable, Logger } from '@nestjs/common';
import FlagDto from './flag.dts';
import FlagsRepository from './flags.repository';

@Injectable()
class FlagsService {
  private readonly logger = new Logger(FlagsService.name);

  constructor(private repository: FlagsRepository) {}

  async get(): Promise<FlagDto[]> {
    const flags = await this.repository.get();
    this.logger.log({ flags });

    return flags;
  }

  async create(flag: FlagDto): Promise<FlagDto | never> {
    const f = await this.repository.create(flag);
    this.logger.log({ flag: f });

    return f;
  }

  toggleEnabled(id: string, isEnabled: boolean): Promise<FlagDto> {
    return this.repository.toggleEnabled(id, isEnabled);
  }

  delete(id: string): void {
    this.repository.delete(id);
  }
}

export default FlagsService;
