import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Schema()
export class Chance extends Document {
	@IsString()
	@Prop()
	description: string;

	@IsString()
	@IsNotEmpty()
	@Prop()
	title: string;

	@IsNumber()
	@IsNotEmpty()
	@Prop()
	price: number;
}

export const ChanceSchema = SchemaFactory.createForClass(Chance);
