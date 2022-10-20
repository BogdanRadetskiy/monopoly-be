import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from 'src/entity/games/entities/game.entity';
import { RoomResponse } from 'src/entity/rooms/dto/responses';

@Injectable()
export class GamesRepository {
	constructor(
		@InjectModel(Game.name)
		private gameModel: Model<Game>
	) {}

	async create(request: RoomResponse): Promise<Game> {
		const createdRoom = new this.gameModel(request);
		return createdRoom.save();
	}

	async findOneById(id: string): Promise<Game> {
		return await this.gameModel
			.findById({ _id: id })
			.populate({
				path: 'settings',
				model: 'Setting',
				populate: [
					{
						path: 'currentPlayer',
						model: 'Player',
					},
					{
						path: 'state',
						model: 'Action',
					},
				],
			})
			.populate({
				path: 'players',
				model: 'Player',
				populate: {
					path: 'userId',
					model: 'User',
				},
			});
	}

	async findAll(): Promise<Game[]> {
		return this.gameModel
			.find()
			.populate({
				path: 'settings',
				model: 'Setting',
				populate: [
					{
						path: 'currentPlayer',
						model: 'Player',
					},
					{
						path: 'state',
						model: 'Action',
					},
				],
			})
			.populate({
				path: 'players',
				model: 'Player',
				populate: {
					path: 'userId',
					model: 'User',
				},
			});
	}

	async remove(id: string): Promise<void> {
		await this.gameModel.findOneAndDelete({ _id: id });
	}
}
