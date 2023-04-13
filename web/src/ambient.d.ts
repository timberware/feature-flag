/* eslint-disable no-unused-vars */
declare type ThemeVariant = 'primary' | 'secondary';

declare type FlagType = 'boolean' | 'string' | 'number';
declare type FlagValueType = boolean | string | number;
declare type FlagEnv = 'staging' | 'production';

declare type FlagDataType = {
  name: string;
  type: FlagType;
  value: FlagValueType;
  environment: FlagEnv;
};
