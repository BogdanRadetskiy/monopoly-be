import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPasswordRequest {
	@ApiProperty({ example: 'example@mail.com' })
	@IsNotEmpty()
	@IsEmail()
	@Expose()
	email: string;
}
