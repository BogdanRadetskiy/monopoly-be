import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { ActionEnum } from 'src/common';

export class ActionDto {
	@ApiProperty({ enum: ActionEnum })
	@Expose()
	@IsEnum(ActionEnum)
	name: ActionEnum;

	@ApiProperty({ example: 3000 })
	@Expose()
	@IsNumber()
	timer: number;
}
