import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsString, Validate } from 'class-validator';
import { arrayInMultipartRequestHelper, ArrayDtoValidation } from 'src/common/helpers';
import { StarDto } from '../../../stars/dto/star.dto';
import { FieldDto } from '../field.dto';

export class CreateFieldRequest extends FieldDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	avatar: string;

	@ApiProperty({ example: 'id' })
	@Expose()
	@IsString()
	monopolyId: string;

	@ApiProperty({
		isArray: true,
		type: StarDto,
	})
	@Expose()
	@Transform(({ value }) => arrayInMultipartRequestHelper(value))
	@Validate(ArrayDtoValidation, {
		each: true,
	})
	stars: StarDto[];
}
