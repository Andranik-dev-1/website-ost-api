import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryesDocument = Categoryes & Document;

@Schema()
export class Categoryes {
  @Prop({
    type: String,
    required: true,
  })
  en: string;

  @Prop({
    type: String,
    required: true,
  })
  am: string;

  @Prop({
    type: String,
    required: true,
  })
  ru: string;
  
  @Prop({
    type: Number,
    required: true,
  })
  priority: number;
}

export const CategoryesSchema = SchemaFactory.createForClass(Categoryes);
