import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IsBoolean, IsEmail, IsNumber, IsString, IsNotEmpty } from 'class-validator';

@Schema()
export class User extends Document {
	@IsString()
	@IsNotEmpty()
	@Prop({ minlength: 3 })
	username: string;

	@IsString()
	@IsNotEmpty()
	@Prop({ minlength: 8 })
	password: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
	friends: User[];

	@IsString()
	@Prop()
	token: string;

	@IsString()
	@Prop()
	avatar: string;

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	@Prop({ unique: true })
	email: string;

	@IsNumber()
	@Prop()
	paymentInfo: number;

	@IsString()
	@Prop({ default: null })
	currentRoom: string | null;

	@IsBoolean()
	@Prop({ default: false })
	online: boolean;

	@Prop()
	gameId: null | string;
}

export const UserSchema = SchemaFactory.createForClass(User);
