import { FlagType, FlagValueType } from './schemas/flag.schema';

export default class FlagDto {
  name!: string;

  type!: FlagType;

  value!: FlagValueType;
}
