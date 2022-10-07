import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlagType = 'bool' | 'string' | 'number';
export type FlagValueType = string | number | boolean;

@Schema()
export class Flag {
  @Prop({ type: String, index: { unique: true } })
  name!: string;

  @Prop()
  type!: FlagType;

  @Prop({ type: String || Number || Boolean })
  value!: FlagValueType;
}

export type FlagDocument = Flag & Document;

export const FlagSchema = SchemaFactory.createForClass(Flag);
