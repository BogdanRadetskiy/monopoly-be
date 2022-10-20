import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Action } from 'src/entity/action/entities/action.entity';
import { Player } from 'src/entity/players/entities/player.entity';

@Schema()
export class Setting extends Document {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Action' })
	state: Action['_id'];

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Player' })
	currentPlayer: Player['_id'];
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
