import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../../repository/repositories/users.repository';
import { Room } from './entities/room.entity';
import { RoomsRepository } from '../../repository';
import { RoomResponse } from './dto/responses/room.response';
import { RoomDto } from './dto/room.dto';
import { UpdateRoomRequest } from './dto/requests/update-room.request';
import { RemoveUserForRoomRequest } from './dto/requests/remove-user-to-room.request';
@Injectable()
export class RoomsService {
	constructor(private readonly usersRepository: UsersRepository, private readonly roomsRepository: RoomsRepository) {}

	async createRoom(request: RoomDto, user: User): Promise<Room> {
		const existUser = await this.usersRepository.findOneById(user.id);
		if (existUser.currentRoom) {
			throw new ConflictException('User already have a room.');
		}
		const createdRoom = await this.roomsRepository.create({
			...request,
			host: user.id,
			hostName: user.username,
			users: [user.id],
		});
		existUser.currentRoom = createdRoom._id;
		existUser.online = true;
		await existUser.save();
		return this.roomsRepository.findOneById(createdRoom._id);
	}

	async findAllRooms(): Promise<RoomResponse[]> {
		return this.roomsRepository.findAll().then(RoomResponse.mapFromMulti);
	}

	async findRoomById(id: string): Promise<Room> {
		let room;
		try {
			room = await this.roomsRepository.findOneById(id);
		} catch {
			throw new NotFoundException(`There isn't any room with id: ${id}`);
		}
		return room;
	}

	async updateRoom(id: string, request: UpdateRoomRequest): Promise<RoomResponse> {
		return this.roomsRepository.update(id, request).then(RoomResponse.mapFrom);
	}

	async removeUserFromRoom(dto: RemoveUserForRoomRequest, user: User): Promise<RoomResponse> {
		const currentRoom = await this.findRoomById(dto.roomId);
		if (!currentRoom.users.find(currentUser => currentUser._id.toString() === dto.userId)) {
			throw new BadRequestException('User does not exist in this room');
		}
		if (currentRoom.host === user.id) {
			currentRoom.users = currentRoom.users.filter(item => item.id.toString() !== dto.userId);
			await currentRoom.save();
			if (!currentRoom.users.length) {
				await this.roomsRepository.remove(currentRoom.id);
			}
			const localUser = await this.usersRepository.findOneById(dto.userId);
			localUser.currentRoom = null;
			await localUser.save();
			return currentRoom;
		} else {
			throw new BadRequestException('You cannot remove this user');
		}
	}

	async removeRoom(id: string): Promise<void> {
		await this.roomsRepository.remove(id);
	}
}
