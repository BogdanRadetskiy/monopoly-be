import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type, plainToClass } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { FieldResponse } from 'src/entity/fields/dto';
import { PlayerResponse } from 'src/entity/players/dto';
import { SettingResponse } from 'src/entity/settings/dto';
import { Game } from '../../entities/game.entity';

export class GameResponse {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	id: string;

	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	typeGame: string;

	@ApiProperty({ type: FieldResponse, isArray: true })
	@Expose()
	@ValidateNested()
	@Type(() => FieldResponse)
	fields: FieldResponse[];

	@ApiProperty({ type: PlayerResponse, isArray: true })
	@Expose()
	@ValidateNested()
	@Type(() => PlayerResponse)
	players: PlayerResponse[];

	@ApiProperty({ type: SettingResponse })
	@Expose()
	@ValidateNested()
	@Type(() => SettingResponse)
	settings: SettingResponse;

	static mapFrom(game: Game): GameResponse {
		game.players.forEach(player => (player.user = player.userId));
		return plainToClass(GameResponse, game, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(games: Game[]): GameResponse[] {
		return games.map(GameResponse.mapFrom);
	}
}
