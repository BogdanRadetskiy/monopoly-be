import {
	Injectable,
	HttpException,
	HttpStatus,
	NotFoundException,
	BadRequestException,
	ConflictException,
} from '@nestjs/common';
import { RegistrationDto } from 'src/auth';
import { ImageDataType } from 'src/common';
import { StorageService } from '../storage/storage.service';
import { UserResponse, FriendRequest, UpdateUserRequest } from './dto';
import { JoinRoomRequest } from '../rooms/dto/requests/join-room.request';
import { RoomsRepository } from '../../repository';
import { User } from './entities/user.entity';
import { UsersRepository } from '../../repository/repositories/users.repository';
import { RoomsService } from '../rooms/rooms.service';
import { prepareDataToUpdate } from '../../common/helpers/prepare-data-to-update.helper';
@Injectable()
export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly storageService: StorageService,
		private readonly roomsRepository: RoomsRepository,
		private readonly roomsService: RoomsService
	) {}

	async createUser(createUserDto: RegistrationDto): Promise<User> {
		try {
			return this.usersRepository.create(createUserDto);
		} catch (error) {
			console.warn('error: ', error);
			throw new HttpException(`Registration problem when creating user: ${error}`, HttpStatus.FORBIDDEN);
		}
	}

	async getAllUsers(): Promise<UserResponse[]> {
		return this.usersRepository.findAll().then(UserResponse.mapFromMulti);
	}

	async getUserByUserName(name: string): Promise<User> {
		let user;
		try {
			user = await this.usersRepository.findOneByUsername(name).then(UserResponse.mapFrom);
		} catch {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	async getUserById(id: string): Promise<User> {
		let user;
		try {
			user = await this.usersRepository.findOneById(id);
		} catch {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	async searchUsers(username: string, currentUserId: string): Promise<UserResponse[]> {
		const result = await this.usersRepository.searchUsers(username).then(UserResponse.mapFromMulti);
		const filteredResult = result.filter(item => item.id !== currentUserId);
		return filteredResult;
	}

	async addFriend(dto: FriendRequest, userId: string): Promise<UserResponse> {
		const user = await this.getUserById(userId);

		const friend = await this.getUserById(dto.friendId);

		const isNotAlreadyFriends = !user.friends.includes(friend);

		if (isNotAlreadyFriends) {
			user.friends.push(friend.id);
			friend.friends.push(user.id);
			await this.usersRepository.update(friend.id, friend);

			const updatedUser = await this.usersRepository.update(user.id, user);
			return UserResponse.mapFrom(updatedUser);
		} else {
			throw new BadRequestException('Friends already exist ');
		}
	}

	async deleteFriend(dto: FriendRequest, userId: string): Promise<UserResponse> {
		const user = await this.getUserById(userId);
		const friend = await this.getUserById(dto.friendId);

		friend.friends = friend.friends.filter(friend => friend.id !== userId);
		user.friends = user.friends.filter(friend => friend.id !== dto.friendId);

		await this.usersRepository.update(dto.friendId, friend);
		const updatedUser = await this.usersRepository.update(userId, user);

		return UserResponse.mapFrom(updatedUser);
	}

	async joinToRoom(dto: JoinRoomRequest, userId: string): Promise<UserResponse> {
		const user = await this.getUserById(userId);
		if (user.currentRoom) {
			throw new BadRequestException('User already in different room ');
		}
		const room = await this.roomsService.findRoomById(dto.roomId);

		const isUserAlreadyInRoom = room.users.map(user => user._id).includes(user._id);

		if (isUserAlreadyInRoom) {
			throw new BadRequestException('User already joined ');
		}

		room.users.push(user.id);
		await this.roomsRepository.update(room.id, room);
		user.currentRoom = room._id;
		const updatedUser = await this.usersRepository.update(user.id, user);
		return UserResponse.mapFrom(updatedUser);
	}

	async updateUser(id: string, updateUserDto: UpdateUserRequest, fileData?: ImageDataType): Promise<UserResponse> {
		const user = await this.getUserById(id);

		if (updateUserDto?.email) {
			const existEmail = await this.usersRepository.findOneByEmail(updateUserDto.email);
			if (existEmail && user.email !== updateUserDto.email) {
				throw new ConflictException(`User with ${updateUserDto.email} email already exist`);
			}
		}

		if (updateUserDto?.username) {
			const existName = await this.usersRepository.findOneByUsername(updateUserDto.username);
			if (existName && user.username !== updateUserDto.username) {
				throw new ConflictException(`User with ${updateUserDto.username} username already exist`);
			}
		}

		const avatar = user.avatar;
		if (fileData) {
			if (avatar) {
				await this.storageService.delete(avatar);
			}
			const file = await this.storageService.save(fileData);
			updateUserDto.avatar = file.url;
		}

		const updatedUser = await this.usersRepository.update(user.id, prepareDataToUpdate(updateUserDto));
		return UserResponse.mapFrom(updatedUser);
	}

	async leaveRoom(user: User, id: string): Promise<User> {
		const currentRoom = await this.roomsService.findRoomById(id);
		if (!currentRoom.users.find(currentUser => currentUser._id.toString() === user.id)) {
			throw new BadRequestException('User does not exist in this room');
		}
		currentRoom.users = currentRoom.users.filter(item => item.id.toString() !== user.id);
		if (currentRoom.users.length) {
			if (currentRoom.host === user._id) {
				currentRoom.host = currentRoom.users[0]._id;
				currentRoom.hostName = currentRoom.users[0].username;
			}
			await currentRoom.save();
		} else {
			try {
				await this.roomsRepository.remove(currentRoom.id);
			} catch (error) {
				throw new HttpException({ error, message: 'Problem with delete room.' }, HttpStatus.FAILED_DEPENDENCY);
			}
		}
		const localUser = await this.getUserById(user.id);
		localUser.currentRoom = null;
		await localUser.save();

		return localUser;
	}

	async remove(id: string): Promise<void> {
		return this.usersRepository.remove(id);
	}
}
