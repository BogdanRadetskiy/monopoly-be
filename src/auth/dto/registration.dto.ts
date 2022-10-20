import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegistrationDto extends LoginDto {
	@ApiProperty({ example: 'username' })
	@IsNotEmpty()
	@IsString()
	username: string;
}
