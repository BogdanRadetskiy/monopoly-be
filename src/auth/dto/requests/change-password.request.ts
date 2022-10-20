import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordRequest {
	@ApiProperty({ example: '12345678' })
	@IsNotEmpty()
	@IsString()
	oldPassword: string;

	@ApiProperty({ example: '1234567890' })
	@IsNotEmpty()
	@IsString()
	newPassword: string;
}
