
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image_url: string;

  @Prop({ required: true })
  release_date: string;

  @Prop({ required: true })
  isFavorite: boolean;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);