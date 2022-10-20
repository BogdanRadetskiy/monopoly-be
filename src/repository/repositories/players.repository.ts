import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from 'src/entity/players/entities/player.entity';
import { BaseUserResponse } from 'src/entity/users/dto/responses/base-user.response';
import { PlayerColorEnum, randomProperty } from 'src/common';
import { UpdatePlayerRequest } from 'src/entity/players/dto';

@Injectable()
export class PlayersRepository {
	constructor(
		@InjectModel(Player.name)
		private playerModel: Model<Player>
	) {}

	async create(request: BaseUserResponse[], gameId: string): Promise<Player[]> {
		const colors = PlayerColorEnum;
		const players = request.map(player => {
			const randomColor = randomProperty(colors);
			delete colors[`${randomColor}`];
			return {
				userId: player.id,
				gameId,
				moneyCount: 0,
				color: randomColor,
				currentFieldPosition: 0,
			};
		});

		return this.playerModel.create(players);
	}

	async findAll(): Promise<Player[]> {
		return this.playerModel.find().populate([{ path: 'userId', model: 'User' }]);
	}

	async findOneById(id: string): Promise<Player> {
		return this.playerModel.findById({ _id: id }).populate([{ path: 'userId', model: 'User' }]);
	}

	async update(id: string, request: UpdatePlayerRequest): Promise<Player> {
		return this.playerModel.findByIdAndUpdate({ _id: id }, { ...request }, { new: true });
	}

	async remove(id: string): Promise<void> {
		await this.playerModel.findOneAndDelete({ _id: id });
	}
}
