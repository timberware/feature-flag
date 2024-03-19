import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flag, FlagDocument } from './schemas/flag.schema';
import { Model, Types } from 'mongoose';
import FlagDto from './flag.dts';

@Injectable()
class FlagRepository {
  private readonly logger = new Logger(FlagRepository.name);

  constructor(
    @InjectModel(Flag.name)
    private db: Model<FlagDocument>,
  ) {}

  private formatFlags(flags: FlagDocument[]): FlagDto[] {
    return flags.map(
      ({ _id, name, type, value, environment, project, isEnabled }) => ({
        id: _id as Types.ObjectId,
        name,
        type,
        value,
        environment,
        project,
        isEnabled,
      }),
    );
  }

  async create(flag: FlagDto): Promise<FlagDto> {
    const newFlag = new this.db(flag);
    const f = await newFlag.save();

    return this.formatFlags([f])[0];
  }

  async get(): Promise<FlagDto[]> {
    const fs = await this.db.find();

    return this.formatFlags(fs);
  }

  async toggleEnabled(id: string, isEnabled: boolean): Promise<FlagDto> {
    const f = await this.db
      .findByIdAndUpdate(
        { _id: new Types.ObjectId(id) },
        { isEnabled },
        { new: true },
      )
      .orFail();

    return this.formatFlags([f])[0];
  }

  async delete(id: string): Promise<void> {
    await this.db.findByIdAndRemove({ _id: new Types.ObjectId(id) }).orFail();
  }
}

export default FlagRepository;
