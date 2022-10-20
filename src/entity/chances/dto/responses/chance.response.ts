import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { Chance } from '../../entities/chance.entity';
import { ChanceDto } from '../chance.dto';

export class ChanceResponse extends ChanceDto {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	id?: string;

	static mapFrom(chance: Chance): ChanceResponse {
		return plainToClass(ChanceResponse, chance, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(chances: Chance[]): ChanceResponse[] {
		return chances.map(ChanceResponse.mapFrom);
	}
}
