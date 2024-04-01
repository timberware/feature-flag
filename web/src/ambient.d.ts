export type FlagTypes = 'boolean' | 'string' | 'number';
export type FlagValueType = boolean | string | number;
export type FlagEnv = 'staging' | 'production';

export type FlagType = {
  id?: string;
  name: string;
  type: FlagTypes;
  value: FlagValueType;
  environment: FlagEnv;
  project: string;
  isEnabled: boolean;
};
