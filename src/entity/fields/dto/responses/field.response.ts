import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { PlayerResponse } from 'src/entity/players/dto';
import { StarResponse } from 'src/entity/stars/dto';
import { Field } from '../../entities/field.entity';
import { FieldDto } from '../field.dto';

export class FieldResponse extends FieldDto {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	id?: string;

	@ApiProperty({ example: 'url' })
	@Expose()
	@IsString()
	avatar: string;

	@ApiProperty({ type: PlayerResponse })
	@Expose()
	@Type(() => PlayerResponse)
	player: PlayerResponse;

	@ApiProperty()
	@Expose()
	@IsString()
	monopolyId: string;

	@ApiProperty({ type: StarResponse, isArray: true })
	@Expose()
	@Type(() => StarResponse)
	stars: StarResponse[];

	static mapFrom(field: Field): FieldResponse {
		return plainToClass(FieldResponse, field, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(fields: Field[]): FieldResponse[] {
		return fields.map(FieldResponse.mapFrom);
	}
}
