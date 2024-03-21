import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type FlagType = 'boolean' | 'string' | 'number';
export type FlagValueType = string | number | boolean;
export type FlagEnv = 'staging' | 'production';

@Schema()
export class Flag {
  @Prop({ type: String, default: () => uuidv4() })
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  type: FlagType;

  @Prop({ type: String || Number || Boolean, required: true })
  value: FlagValueType;

  @Prop({ type: String, required: true })
  environment: FlagEnv;

  @Prop({ type: String, required: true })
  project: string;

  @Prop({ type: Boolean, default: true })
  isEnabled: boolean;
}

export type FlagDocument = Flag & Document;

export const FlagSchema = SchemaFactory.createForClass(Flag);

FlagSchema.index({ name: 1, environment: 1 }, { unique: true });
