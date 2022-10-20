import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsOptional, IsEnum, IsNumber, IsString, IsBoolean } from 'class-validator';
import { FieldTypeEnum, numberTransform } from 'src/common';

export class FieldDto {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	name: string;

	@ApiPropertyOptional({ enum: FieldTypeEnum, example: FieldTypeEnum.Field })
	@Expose()
	@IsOptional()
	@IsEnum(FieldTypeEnum)
	type: FieldTypeEnum;

	@ApiProperty({ example: 1 })
	@Expose()
	@IsNumber()
	@Transform(numberTransform)
	staticId: number;

	@ApiProperty({ example: 'false' })
	@Expose()
	@IsBoolean()
	isCustom: boolean;
}
