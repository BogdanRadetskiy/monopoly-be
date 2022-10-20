import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Star } from 'src/entity/stars/entities/star.entity';
import { Player } from 'src/entity/players/entities/player.entity';
import { IsString } from 'class-validator';
import { FieldTypeEnum } from 'src/common/enums/field-type.enum';

@Schema()
export class Field extends Document {
	@Prop()
	name: string;

	@Prop()
	monopolyId: string;

	@IsString()
	@Prop()
	avatar: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stars' }] })
	stars: Star['id'];

	@Prop()
	isCustom: boolean;

	@Prop()
	staticId: number;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Players' })
	player: null | Player['id'];

	@Prop()
	type: FieldTypeEnum;
}
export const FieldSchema = SchemaFactory.createForClass(Field);
