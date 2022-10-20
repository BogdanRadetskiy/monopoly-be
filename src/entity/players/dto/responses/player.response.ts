import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { UserResponse } from 'src/entity/users/dto';
import { Player } from '../../entities/player.entity';
import { PlayerDto } from '../player.dto';

export class PlayerResponse extends PlayerDto {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	id: string;

	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	gameId: string;

	@ApiProperty({ type: UserResponse })
	@Expose()
	@ValidateNested()
	@Type(() => UserResponse)
	user: UserResponse;

	@ApiProperty({ example: 0 })
	@Expose()
	@IsNumber()
	currentFieldPosition: number;

	static mapFrom(player: Player): PlayerResponse {
		return plainToClass(PlayerResponse, player, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(players: Player[]): PlayerResponse[] {
		return players.map(PlayerResponse.mapFrom);
	}
}
