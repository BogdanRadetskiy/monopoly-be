import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MonopolyTypes } from 'src/common/enums/type-monopoly';
import { Document } from 'mongoose';
import { IsBoolean } from 'class-validator';
@Schema()
export class Monopoly extends Document {
	@Prop({ unique: true })
	name: string;

	@Prop({ unique: true })
	type: MonopolyTypes;

	@Prop({ unique: true })
	color: string;

	@IsBoolean()
	@Prop({ default: false })
	buyStatus: boolean;
}

export const MonopolySchema = SchemaFactory.createForClass(Monopoly);
