import { Injectable, NotFoundException } from '@nestjs/common';
import { GamesRepository } from 'src/repository/repositories/games.repository';
import { PlayersService } from '../players/players.service';
import { RoomResponse } from '../rooms/dto';
import { RoomsService } from '../rooms/rooms.service';
import { SettingsService } from './../settings/setting.service';
import { GameResponse } from './dto';
import { FieldsRepository } from '../../repository/repositories/fields.repository';

@Injectable()
export class GamesService {
	constructor(
		private gamesRepository: GamesRepository,
		private playersService: PlayersService,
		private roomsService: RoomsService,
		private settingsService: SettingsService,
		private fieldRepository: FieldsRepository
	) {}

	async createGame(roomId: string): Promise<GameResponse> {
		const room = await this.roomsService.findRoomById(roomId).then(RoomResponse.mapFrom);
		const createdGame = await this.gamesRepository.create(room);
		const getAllPlayers = await this.playersService.createPlayer(room.users, createdGame.id);
		const settings = await this.settingsService.createSetting({ currentPlayerId: getAllPlayers[0]?.id || '' });
		const fields = await this.fieldRepository.findAllByCustom();
		createdGame.players = getAllPlayers;
		createdGame.settings = settings.id;
		await createdGame.save();

		const res = await this.findGameById(createdGame.id);
		res.fields = fields;
		return res;
	}

	async findAllGames(): Promise<GameResponse[]> {
		return this.gamesRepository.findAll().then(GameResponse.mapFromMulti);
	}

	async findGameById(id: string): Promise<GameResponse> {
		let game;
		try {
			game = await this.gamesRepository.findOneById(id).then(GameResponse.mapFrom);
		} catch {
			throw new NotFoundException(`There isn't any game with id: ${id}`);
		}
		const fields = await this.fieldRepository.findAllByCustom();
		game.fields = fields;
		return game;
	}

	async removeGame(id: string): Promise<void> {
		await this.gamesRepository.remove(id);
	}
}
