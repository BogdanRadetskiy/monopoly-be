import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { booleanTransform } from 'src/common';

export class UserDto {
	@ApiPropertyOptional({ example: 'Igarion9' })
	@Expose()
	@IsOptional()
	@IsString()
	username?: string;

	@ApiPropertyOptional({ example: 'url' })
	@Expose()
	@IsString()
	avatar?: string;

	@ApiPropertyOptional({ example: 'igarion9@mail.com' })
	@Expose()
	@IsOptional()
	@IsString()
	email?: string;

	@ApiPropertyOptional({ example: 'string' })
	@Expose()
	@IsOptional()
	@IsString()
	gameId?: string;

	@ApiPropertyOptional({ example: true })
	@Expose()
	@IsOptional()
	@Transform(booleanTransform)
	@IsBoolean()
	online?: boolean;
}
