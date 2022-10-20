import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyDto {
	@IsNotEmpty()
	@IsString()
	id: string;

	@IsNotEmpty()
	@IsString()
	username: string;
}
