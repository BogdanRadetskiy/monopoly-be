import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from 'src/entity/users/entities/user.entity';
import { ArrayUnique, IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { GameTypeEnum } from 'src/common';
@Schema()
export class Room extends Document {
	@IsNotEmpty()
	@ArrayUnique()
	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	})
	users: Array<User>;

	@IsNotEmpty()
	@Prop({ unique: true })
	host: string;

	@IsNotEmpty()
	@Prop({ default: 'Player' })
	hostName: string;

	@IsEnum(GameTypeEnum)
	@Prop({ default: 'default' })
	typeGame: GameTypeEnum;

	@IsNumber()
	@Prop({ default: 4 })
	quantityPlace: number;

	@IsBoolean()
	@Prop({ default: false })
	privateMode: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
