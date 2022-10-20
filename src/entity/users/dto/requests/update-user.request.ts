import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';
import { numberTransform } from 'src/common';
import { User } from '../../entities/user.entity';
import { UserDto } from '../user.dto';

export class UpdateUserRequest extends UserDto {
	@ApiPropertyOptional({ type: 'string', format: 'binary' })
	@IsOptional()
	avatar?: string;

	@ApiPropertyOptional({ example: 1 })
	@IsOptional()
	@Transform(numberTransform)
	@Expose()
	@IsNumber()
	paymentInfo?: number;

	static mapFrom(user: User): UpdateUserRequest {
		return plainToClass(UpdateUserRequest, user, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(users: User[]): UpdateUserRequest[] {
		return users.map(UpdateUserRequest.mapFrom);
	}
}
