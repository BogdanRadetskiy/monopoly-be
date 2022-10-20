import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type, plainToClass } from 'class-transformer';
import { User } from '../../entities/user.entity';
import { BaseUserResponse } from './base-user.response';

export class UserResponse extends BaseUserResponse {
	@ApiProperty({ type: BaseUserResponse, isArray: true })
	@Expose()
	@Type(() => BaseUserResponse)
	friends: BaseUserResponse[];

	static mapFrom(user: User): UserResponse {
		return plainToClass(UserResponse, user, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(users: User[]): UserResponse[] {
		return users.map(UserResponse.mapFrom);
	}
}
