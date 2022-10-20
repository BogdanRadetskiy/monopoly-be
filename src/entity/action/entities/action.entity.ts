import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ActionEnum } from 'src/common';

@Schema()
export class Action extends Document {
	@Prop()
	name: ActionEnum;

	@Prop()
	timer: number;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
