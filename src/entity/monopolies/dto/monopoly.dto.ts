import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { MonopolyTypes } from 'src/common/enums/type-monopoly';

export class MonopolyDto {
	@ApiProperty({ example: 'name' })
	@Expose()
	@IsString()
	name: string;

	@ApiPropertyOptional({ enum: MonopolyTypes })
	@Expose()
	@IsOptional()
	@IsEnum(MonopolyTypes)
	type: MonopolyTypes;

	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	color: string;

	@ApiProperty({ example: 'false' })
	@Expose()
	@IsBoolean()
	buyStatus: boolean;
}
