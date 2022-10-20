import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { BaseUserResponse } from 'src/entity/users/dto/responses/base-user.response';
import { User } from 'src/entity/users/entities/user.entity';
import { LoginDto } from '../login.dto';

export class LoginResponse extends LoginDto {
	@ApiProperty({ example: false })
	@IsNotEmpty()
	@IsBoolean()
	@Expose()
	online: boolean;

	@ApiProperty({ example: '631774b621ade990770641f5' })
	@IsNotEmpty()
	@Expose()
	@IsString()
	id: string;

	@ApiProperty({ example: 'username' })
	@IsNotEmpty()
	@Expose()
	@IsString()
	username: string;

	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2V...' })
	@IsNotEmpty()
	@Expose()
	@IsString()
	token: string;

	@ApiProperty({ type: BaseUserResponse, isArray: true })
	@Expose()
	@Type(() => BaseUserResponse)
	friends: BaseUserResponse[];

	static mapFrom(user: User): LoginResponse {
		return plainToClass(LoginResponse, user, {
			excludeExtraneousValues: true,
		});
	}
}
