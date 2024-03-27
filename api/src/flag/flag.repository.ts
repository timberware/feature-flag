import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flag, FlagDocument } from './schemas/flag.schema';
import { Model, Types } from 'mongoose';
import FlagDto from './flag.dts';
import QueryDto from './query.dts';
import { cleanObject } from '../common';

@Injectable()
class FlagRepository {
  constructor(
    @InjectModel(Flag.name)
    private db: Model<FlagDocument>,
  ) {}

  async create(flag: FlagDto): Promise<FlagDto> {
    const newFlag = new this.db(flag);
    const f = await newFlag.save();

    return this.formatFlags([f])[0];
  }

  async get(q: QueryDto): Promise<FlagDto[]> {
    const fs = await this.db.find(cleanObject<QueryDto>(q));

    return this.formatFlags(fs);
  }

  async getById(id: string): Promise<FlagDto> {
    const fs: FlagDocument = await this.db.findById(id).orFail();

    return this.formatFlags([fs])[0];
  }

  async toggleEnabled(id: string, isEnabled: boolean): Promise<FlagDto> {
    const f = await this.db
      .findByIdAndUpdate({ _id: id }, { isEnabled }, { new: true })
      .orFail();

    return this.formatFlags([f])[0];
  }

  async delete(id: string): Promise<void> {
    await this.db.findByIdAndRemove(id).orFail();
  }

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
}

export default FlagRepository;
