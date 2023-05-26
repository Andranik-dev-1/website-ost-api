import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({
    type: Map,
    of: String,
    required: true,
  })
  name: Record<string, string>;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: String,
    required: true,
  })
  imageSrc: string;

  @Prop({
    type: Map,
    of: String,
    required: true,
  })
  description: Record<string, string>;

  @Prop({
    type: String,
    required: true,
  })
  category: string;

  @Prop({
    type: Number,
    required: true,
  })
  priority: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
