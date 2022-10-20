import { Injectable } from '@nestjs/common';
import { PlayersRepository } from 'src/repository/repositories/players.repository';
import { BaseUserResponse } from '../users/dto/responses/base-user.response';
import { PlayerResponse, UpdatePlayerRequest } from './dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
	constructor(private playersRepository: PlayersRepository) {}

	async createPlayer(players: BaseUserResponse[], gameId: string): Promise<Player[]> {
		return this.playersRepository.create(players, gameId);
	}

	async findAllPlayers(): Promise<PlayerResponse[]> {
		return this.playersRepository.findAll().then(PlayerResponse.mapFromMulti);
	}

	async findPlayerById(id: string): Promise<PlayerResponse> {
		return await this.playersRepository.findOneById(id).then(PlayerResponse.mapFrom);
	}

	async updatePlayer(id: string, request: UpdatePlayerRequest): Promise<PlayerResponse> {
		return this.playersRepository.update(id, request).then(PlayerResponse.mapFrom);
	}

	async removePlayer(id: string): Promise<void> {
		await this.playersRepository.remove(id);
	}
}
