import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordRequest {
	@ApiProperty({ example: 'id' })
	@IsNotEmpty()
	@IsString()
	@Expose()
	id: string;

	@ApiProperty({ example: '12345678' })
	@IsNotEmpty()
	@IsString()
	password: string;
}
