import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Body,
	Patch,
	UseInterceptors,
	UploadedFile,
	Delete,
	Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { HttpAuth } from 'src/auth';
import { HttpUser, ImageInterceptor, ImageDataType } from 'src/common';
import { EventGateway } from 'src/eventGateway/event.gateway';
import { LoggerApi } from 'src/logger';
import { JoinRoomRequest } from '../rooms/dto/requests/join-room.request';
import { UserResponse, FriendRequest, UpdateUserRequest } from './dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@LoggerApi()
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService, private readonly eventGateway: EventGateway) {}

	@Get()
	@ApiOperation({ summary: '[GetAllUsers]', description: 'get all users' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: UserResponse, isArray: true })
	async getAllUsers(): Promise<UserResponse[]> {
		return this.usersService.getAllUsers();
	}

	@Get('/search')
	@ApiOperation({ summary: '[SearchUsers]', description: 'search users by name' })
	@HttpCode(HttpStatus.OK)
	@HttpAuth()
	@ApiResponse({ type: UserResponse, isArray: true })
	async searchUsers(@Query('search') searchValue: string, @HttpUser() user: User): Promise<UserResponse[]> {
		return this.usersService.searchUsers(searchValue, user.id);
	}

	@Get(':id')
	@ApiOperation({ summary: '[GetUser]', description: 'get user' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: UserResponse })
	async getUserById(@Param('id') id: string): Promise<UserResponse> {
		return this.usersService.getUserById(id).then(user => UserResponse.mapFrom(user));
	}

	@Post('/add-friend')
	@ApiOperation({ summary: '[AddFriend]', description: 'add friend' })
	@HttpCode(HttpStatus.OK)
	@HttpAuth()
	@ApiResponse({ type: UserResponse })
	async addFriend(@Body() addFriendDto: FriendRequest, @HttpUser() user: User): Promise<UserResponse> {
		return this.usersService.addFriend(addFriendDto, user.id);
	}

	@Post('/delete-friend')
	@ApiOperation({ summary: '[DeleteFriend]', description: 'delete friend' })
	@HttpCode(HttpStatus.OK)
	@HttpAuth()
	@ApiResponse({ type: UserResponse })
	async deleteFriend(@Body() deleteFriendDto: FriendRequest, @HttpUser() user: User): Promise<UserResponse> {
		return this.usersService.deleteFriend(deleteFriendDto, user.id);
	}

	@Post('/join-to-room')
	@ApiOperation({ summary: '[AddUserToRoom]', description: 'add user to room' })
	@HttpCode(HttpStatus.OK)
	@HttpAuth()
	@ApiResponse({ type: UserResponse })
	async addUserToRoom(@Body() addUserToRoomDto: JoinRoomRequest, @HttpUser() user: User): Promise<UserResponse> {
		const res = await this.usersService.joinToRoom(addUserToRoomDto, user.id);
		await this.eventGateway.getAllRooms();
		return res;
	}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(ImageInterceptor())
	@ApiConsumes('multipart/form-data')
	@ApiResponse({ type: UserResponse })
	@ApiOperation({ summary: '[UpdateUser]', description: 'update user' })
	async updateUser(
		@Param('id') id: string,
		@Body() request: UpdateUserRequest,
		@UploadedFile() file: ImageDataType
	): Promise<UserResponse> {
		return this.usersService.updateUser(id, request, file);
	}

	@Post('/leave')
	@ApiOperation({ summary: '[LeaveRoom]', description: 'leave room' })
	@ApiResponse({ type: UserResponse })
	@HttpCode(HttpStatus.OK)
	@HttpAuth()
	async leaveRoom(@Body() req: JoinRoomRequest, @HttpUser() user: User): Promise<UserResponse> {
		const response = await this.usersService.leaveRoom(user, req.roomId);
		await this.eventGateway.getAllRooms();
		return response;
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteUser]', description: 'delete user' })
	@HttpCode(HttpStatus.NO_CONTENT)
	async removeRoom(@Param('id') id: string): Promise<void> {
		return this.usersService.remove(id);
	}
}
