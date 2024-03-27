import { IsNotEmpty, IsIn, IsString, IsOptional } from 'class-validator';
import { FlagEnv } from './schemas/flag.schema';

export default class QueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsIn(['staging', 'production'])
  @IsOptional()
  environment?: FlagEnv;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  project?: string;
}
