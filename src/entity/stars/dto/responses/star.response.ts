import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { Star } from '../../entities/star.entity';
import { StarDto } from '../star.dto';

export class StarResponse extends StarDto {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	id?: string;

	@ApiProperty({ example: 'id' })
	@Expose()
	@IsString()
	fieldId: string;

	static mapFrom(star: Star): StarResponse {
		return plainToClass(StarResponse, star, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(stars: Star[]): StarResponse[] {
		return stars.map(StarResponse.mapFrom);
	}
}
