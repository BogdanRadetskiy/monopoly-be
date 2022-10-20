import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChanceDto {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	description?: string;

	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ example: 2222 })
	@Expose()
	@IsNumber()
	@IsNotEmpty()
	price: number;
}
