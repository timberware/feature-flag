export type FlagType = 'boolean' | 'string' | 'number';
export type FlagValueType = boolean | string | number;
export type FlagEnv = 'staging' | 'production';

export type Flag = {
  id?: string;
  name: string;
  type: FlagType;
  value: FlagValueType;
  environment: FlagEnv;
  project: string;
  isEnabled?: boolean;
};
