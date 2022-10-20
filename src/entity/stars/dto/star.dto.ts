import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { StarTypeEnum } from 'src/common';

export class StarDto {
	@ApiProperty({ example: 'number' })
	@Expose()
	@IsNumber()
	price: number;

	@ApiProperty({ example: 1 })
	@Expose()
	@IsNumber()
	deposit: number;

	@ApiProperty({ enum: StarTypeEnum })
	@Expose()
	@IsEnum(StarTypeEnum)
	type: StarTypeEnum;
}
