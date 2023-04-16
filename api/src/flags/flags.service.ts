import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    return flags.map(({ _id, name, type, value, environment, isEnabled }) => ({
      id: _id as Types.ObjectId,
      name,
      type,
      value,
      environment,
      isEnabled,
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

  async setEnabled({
    id,
    isEnabled,
  }: {
    id: string;
    isEnabled: boolean;
  }): Promise<FlagDto | null> {
    try {
      return await this.FlagModel.findOneAndUpdate(
        { _id: new Types.ObjectId(id) },
        { isEnabled },
        { new: true },
      );
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
