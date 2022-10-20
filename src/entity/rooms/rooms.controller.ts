import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomResponse } from './dto/responses/room.response';
import { HttpUser } from 'src/common';
import { User } from '../users/entities/user.entity';
import { RoomDto } from './dto';
import { HttpAuth } from 'src/auth';
import { UpdateRoomRequest } from './dto/requests/update-room.request';
import { EventGateway } from 'src/eventGateway/event.gateway';
import { LoggerApi } from 'src/logger';
import { RemoveUserForRoomRequest } from './dto/requests/remove-user-to-room.request';
import { UserResponse } from '../users/dto';
import { UsersService } from '../users/users.service';
@Controller('rooms')
@ApiTags('rooms')
@LoggerApi()
@ApiBearerAuth()
export class RoomsController {
	constructor(
		private readonly roomsService: RoomsService,
		private readonly eventGateway: EventGateway,
		private readonly usersService: UsersService
	) {}

	@Get(':id')
	@ApiOperation({ summary: '[GetRoom]', description: 'get room' })
	@ApiResponse({ type: RoomResponse })
	@HttpCode(HttpStatus.OK)
	async findRoomById(@Param('id') id: string): Promise<RoomResponse> {
		return this.roomsService.findRoomById(id).then(room => RoomResponse.mapFrom(room));
	}

	@Get()
	@ApiOperation({ summary: '[GetAllRoom]', description: 'get all room' })
	@ApiResponse({ type: RoomResponse, isArray: true })
	@HttpCode(HttpStatus.OK)
	async findAllRooms(): Promise<RoomResponse[]> {
		return this.roomsService.findAllRooms();
	}

	@Patch(':id')
	@ApiOperation({ summary: '[UpdateRoom]', description: 'update room' })
	@ApiResponse({ type: RoomResponse })
	@HttpCode(HttpStatus.OK)
	async updateRoom(@Body() request: UpdateRoomRequest, @Param('id') id: string): Promise<RoomResponse> {
		const room = await this.roomsService.updateRoom(id, request);
		await this.eventGateway.getAllRooms();
		return room;
	}

	@Post()
	@ApiOperation({ summary: '[CreateRoom]', description: 'create room' })
	@ApiResponse({ type: RoomResponse })
	@HttpCode(HttpStatus.CREATED)
	@HttpAuth()
	async createRoom(@Body() data: RoomDto, @HttpUser() user: User): Promise<RoomResponse> {
		const createdRoom = await this.roomsService.createRoom(data, user).then(room => RoomResponse.mapFrom(room));
		await this.eventGateway.getAllRooms();
		return createdRoom;
	}

	@Post('/remove-user')
	@ApiOperation({ summary: '[RemoveUserFromRoom]', description: 'remove user from room' })
	@HttpCode(HttpStatus.OK)
	@HttpAuth()
	@ApiResponse({ type: UserResponse })
	async removeUserFromRoom(@Body() req: RemoveUserForRoomRequest, @HttpUser() user: User): Promise<RoomResponse> {
		const response = await this.roomsService.removeUserFromRoom(req, user);
		await this.eventGateway.getAllRooms();
		return response;
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteRoom]', description: 'delete room' })
	@HttpCode(HttpStatus.OK)
	async removeRoom(@Param('id') id: string): Promise<void> {
		await this.roomsService.removeRoom(id);
		await this.eventGateway.getAllRooms();
	}
}
