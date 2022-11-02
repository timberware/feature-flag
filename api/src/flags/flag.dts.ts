import { IsNotEmpty, IsIn } from '@nestjs/class-validator';
import { FlagEnv, FlagType, FlagValueType } from './schemas/flag.schema';

export default class FlagDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsIn(['boolean', 'string', 'number'])
  type!: FlagType;

  @IsNotEmpty()
  value!: FlagValueType;

  @IsNotEmpty()
  @IsIn(['staging', 'production'])
  environment!: FlagEnv;
}
