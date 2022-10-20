import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { Monopoly } from '../../entities/monopoly.entity';
import { MonopolyDto } from '../monopoly.dto';

export class MonopolyResponse extends MonopolyDto {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	id?: string;

	static mapFrom(monopoly: Monopoly): MonopolyResponse {
		return plainToClass(MonopolyResponse, monopoly, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(monopolys: Monopoly[]): MonopolyResponse[] {
		return monopolys.map(MonopolyResponse.mapFrom);
	}
}
