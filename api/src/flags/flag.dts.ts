import { IsNotEmpty, IsIn, IsString, IsBoolean } from '@nestjs/class-validator';
import { Types } from 'mongoose';
import { FlagEnv, FlagType, FlagValueType } from './schemas/flag.schema';

export default class FlagDto {
  @IsNotEmpty()
  id?: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsIn(['boolean', 'string', 'number'])
  type!: FlagType;

  @IsNotEmpty()
  value!: FlagValueType;

  @IsNotEmpty()
  @IsIn(['staging', 'production'])
  environment!: FlagEnv;

  @IsNotEmpty()
  @IsBoolean()
  isEnabled?: boolean;
}
