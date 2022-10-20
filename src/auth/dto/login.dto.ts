import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
	@ApiProperty({ example: 'example@mail.com' })
	@IsNotEmpty()
	@IsEmail()
	@Expose()
	email: string;

	@ApiProperty({ example: '12345678' })
	@IsNotEmpty()
	@IsString()
	password: string;
}
