import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { UserDto } from '../user.dto';

export class BaseUserResponse extends UserDto {
	@ApiPropertyOptional({ example: 'string' })
	@IsOptional()
	@Expose()
	@IsString()
	id?: string;

	@ApiProperty({ example: 1 })
	@Expose()
	@IsNumber()
	paymentInfo: number;

	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	currentRoom: string;

	@ApiProperty({ example: 'true' })
	@Expose()
	@IsBoolean()
	online: boolean;
}
