import { Injectable, Logger } from '@nestjs/common';
import FlagDto from './flag.dts';
import QueryDto from './query.dts';
import FlagRepository from './flag.repository';

@Injectable()
class FlagService {
  private readonly logger = new Logger(FlagService.name);

  constructor(private repository: FlagRepository) {}

  async get(q: QueryDto): Promise<FlagDto[]> {
    return await this.repository.get(q);
  }

  async getById(id: string): Promise<FlagDto> {
    return await this.repository.getById(id);
  }

  async create(flag: FlagDto): Promise<FlagDto | never> {
    return await this.repository.create(flag);
  }

  toggleEnabled(id: string, isEnabled: boolean): Promise<FlagDto> {
    return this.repository.toggleEnabled(id, isEnabled);
  }

  delete(id: string): void {
    this.repository.delete(id);
  }
}

export default FlagService;
