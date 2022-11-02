import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlagType = 'boolean' | 'string' | 'number';
export type FlagValueType = string | number | boolean;
export type FlagEnv = 'staging' | 'production';

@Schema()
export class Flag {
  @Prop({ type: String })
  name!: string;

  @Prop({ type: String })
  type!: FlagType;

  @Prop({ type: String || Number || Boolean })
  value!: FlagValueType;

  @Prop({ type: String })
  environment!: FlagEnv;
}

export type FlagDocument = Flag & Document;

export const FlagSchema = SchemaFactory.createForClass(Flag);

FlagSchema.index({ name: 1, environment: 1 }, { unique: true });
