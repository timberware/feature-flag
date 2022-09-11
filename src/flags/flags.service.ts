import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import FlagDto from './flag.dts';
import { Flag, FlagDocument } from './schemas/flag.schema';

@Injectable()
class FlagsService {
  private readonly logger = new Logger(FlagsService.name);

  constructor(
    @InjectModel(Flag.name)
    private FlagModel: Model<FlagDocument>,
  ) {}

  static formatFlags(flags: FlagDocument[]): FlagDto[] {
    return flags.map(({ name, type, value }) => ({
      name,
      type,
      value,
    }));
  }

  async findAll(): Promise<FlagDto[]> {
    const flags = await this.FlagModel.find();
    const formattedFlags = FlagsService.formatFlags(flags);
    this.logger.log({ formattedFlags });
    return formattedFlags;
  }

  async saveFlag(flag: FlagDto): Promise<FlagDto | never> {
    try {
      const newFlag = new this.FlagModel(flag);
      const storedFlag = await newFlag.save();
      const trimmedFlag = FlagsService.formatFlags([storedFlag]);
      this.logger.log({ trimmedFlag });
      return trimmedFlag[0];
    } catch (error) {
      this.logger.error({ error });
      throw new HttpException(
        'Service Unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}

export default FlagsService;
