import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { PlayerDto } from '../player.dto';

export class CreatePlayerRequest extends PlayerDto {
	@ApiPropertyOptional({ example: 'string' })
	@Expose()
	@IsString()
	userId: string;

	@ApiPropertyOptional({ example: 'string' })
	@IsOptional()
	@Expose()
	@IsString()
	gameId: string;

	@ApiPropertyOptional({ example: 'string' })
	@IsOptional()
	@Expose()
	@IsString()
	currentFieldPosition: string;
}
