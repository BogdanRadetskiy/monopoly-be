import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Field } from 'src/entity/fields/entities/field.entity';
import { StarTypeEnum } from 'src/common';

@Schema()
export class Star extends Document {
	@Prop({ type: mongoose.Schema.Types.String, ref: 'Fields' })
	fieldId: Field['_id'];

	@Prop()
	type: StarTypeEnum;

	@Prop()
	price: number;

	@Prop()
	deposit: number;
}

export const StarSchema = SchemaFactory.createForClass(Star);
