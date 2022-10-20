import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/entity/users/entities/user.entity';
import { Game } from 'src/entity/games/entities/game.entity';
import { Field } from 'src/entity/fields/entities/field.entity';
@Schema()
export class Player extends Document {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	userId: User['_id'];

	@Prop()
	moneyCount: number;

	@Prop()
	color: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Game' })
	gameId: Game['_id'];

	@Prop({ type: mongoose.Schema.Types.Number, ref: 'Field' })
	currentFieldPosition: Field['staticId'];
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
