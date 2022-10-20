import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { GameTypeEnum } from 'src/common';

export class RoomDto {
	@ApiPropertyOptional({ enum: GameTypeEnum, example: GameTypeEnum.DEFAULT })
	@Expose()
	@IsOptional()
	@IsEnum(GameTypeEnum)
	typeGame: GameTypeEnum;

	@ApiProperty({ example: 4 })
	@Expose()
	@IsNumber()
	quantityPlace: number;

	@ApiProperty({ example: true })
	@Expose()
	@IsBoolean()
	privateMode: boolean;
}
