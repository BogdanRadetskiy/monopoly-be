import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomRequest, UpdateRoomRequest } from '../../entity/rooms/dto/requests';
import { Room } from '../../entity/rooms/entities/room.entity';

@Injectable()
export class RoomsRepository {
	constructor(
		@InjectModel(Room.name)
		private roomModel: Model<Room>
	) {}

	async create(request: CreateRoomRequest): Promise<Room> {
		const createdRoom = new this.roomModel(request);
		return createdRoom.save();
	}
	async findOneById(id: string): Promise<Room> {
		return this.roomModel.findById({ _id: id }).populate({ path: 'users', model: 'User' });
	}

	async update(id: string, request: UpdateRoomRequest): Promise<Room> {
		return this.roomModel.findByIdAndUpdate({ _id: id }, { ...request }, { new: true });
	}

	async findAll(): Promise<Room[]> {
		return this.roomModel.find().populate({ path: 'users', model: 'User' });
	}

	async remove(id: string): Promise<void> {
		await this.roomModel.findOneAndDelete({ _id: id });
	}
}
