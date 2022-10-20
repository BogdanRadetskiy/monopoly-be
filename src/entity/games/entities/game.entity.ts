import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Field } from 'src/entity/fields/entities/field.entity';
import { Player } from 'src/entity/players/entities/player.entity';
import { GameTypeEnum } from 'src/common';
import { Setting } from 'src/entity/settings/entities/setting.entity';
@Schema()
export class Game extends Document {
	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Players' }] })
	players: Player['id'];

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fields' }] })
	fields: Field['_id'];

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Settings' })
	settings: Setting['_id'];

	@Prop()
	typeGame: GameTypeEnum;
}

export const GameSchema = SchemaFactory.createForClass(Game);
