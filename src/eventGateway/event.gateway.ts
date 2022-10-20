import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, LoggerService, UseGuards } from '@nestjs/common';
import { Room } from 'src/entity/rooms/entities/room.entity';
import { RoomsService } from 'src/entity/rooms/rooms.service';
import { User } from 'src/entity/users/entities/user.entity';
import { ActionEnum, GATEWAY_EVENTS, jwtDecoded, SOCKET_ROOM_EVENTS } from 'src/common';
import { GamesService } from 'src/entity/games/games.service';
import { WsGuard } from 'src/common/guards/webSocket.guard';
import { HandleConnectToGameDto, HandleKickUserFromRommDto } from './event.dto';
import { UsersService } from 'src/entity/users/users.service';

@UseGuards(WsGuard)
@WebSocketGateway({ cors: true })
export class EventGateway {
	@WebSocketServer()
	server: Server;

	private logger: LoggerService;

	constructor(
		private roomsService: RoomsService,
		private gamesService: GamesService,
		private usersService: UsersService
	) {
		this.logger = new Logger(EventGateway.name);
	}

	// Handlers
	public async handleConnection(@ConnectedSocket() socket: Socket) {
		const auth = socket.handshake.headers.authorization;
		try {
			const decoded = jwtDecoded(auth);
			await this.usersService.updateUser(decoded.id, { online: true });
			console.info(`[SOCKET] - Connecting success, user: ${decoded.username}.`);
		} catch {
			console.info('[SOCKET] - Connecting success, user unknown.');
		}
	}

	public async handleDisconnect(@ConnectedSocket() socket: Socket) {
		const auth = socket.handshake.headers.authorization;
		try {
			const decoded = jwtDecoded(auth);
			await this.usersService.updateUser(decoded.id, { online: false });
			console.info(`[SOCKET] - Disconnect, user: ${decoded.username}.`);
		} catch {
			console.info('[SOCKET] - Disconnect, user unknown.');
		}
	}
	//Users
	@SubscribeMessage(GATEWAY_EVENTS.ADD_FRIEND)
	public handleAddFriend(@MessageBody() friend: User) {
		this.logger.log('[SOCKET] -  AddFriend');
		this.server.emit(GATEWAY_EVENTS.ADD_FRIEND, friend);
	}

	@SubscribeMessage(GATEWAY_EVENTS.INVITE_TO_ROOM)
	public handleInviteFriendToRoom(@MessageBody() friend: User, roomId: Room) {
		this.logger.log('[SOCKET] - InviteFriendToRoom');
		this.server.emit(GATEWAY_EVENTS.INVITE_TO_ROOM, friend, roomId);
	}

	//Rooms
	@SubscribeMessage(GATEWAY_EVENTS.JOIN_TO_ROOM)
	public handleJoinToRoom(room: Room) {
		this.logger.log('[SOCKET] -  JoinToRoom');
		this.server.emit(GATEWAY_EVENTS.JOIN_TO_ROOM, room);
	}

	public async getAllRooms() {
		this.logger.log('[SOCKET] - GetAllRooms');
		const rooms = await this.roomsService.findAllRooms();
		this.server.emit(GATEWAY_EVENTS.GET_ALL_ROOMS, rooms);
	}

	@SubscribeMessage(GATEWAY_EVENTS.GET_ALL_ROOMS)
	public async subscribeRooms() {
		await this.getAllRooms();
	}

	@SubscribeMessage(GATEWAY_EVENTS.KICK_USER_FROM_ROOM)
	handleKickUserFromRoom(@MessageBody() req: string) {
		const { roomId, userId }: HandleKickUserFromRommDto = JSON.parse(req);
		this.server.to(roomId).emit(GATEWAY_EVENTS.KICK_USER_FROM_ROOM, userId);
		this.logger.log(`[SOCKET] - Handle kick ${userId} from ${roomId}`);
	}

	//Games
	@SubscribeMessage(GATEWAY_EVENTS.HANDLE_CONNECT_TO_GAME)
	handleConnectToGame(@MessageBody() req: string) {
		const { roomId, gameId }: HandleConnectToGameDto = JSON.parse(req);
		this.server.to(roomId).emit(GATEWAY_EVENTS.HANDLE_CONNECT_TO_GAME, gameId);
		this.logger.log(`[SOCKET] - Handle connect to game ${gameId}`);
	}

	@SubscribeMessage(GATEWAY_EVENTS.CREATE_GAME)
	public async handleCreateGame(@MessageBody() roomId: string) {
		this.logger.log('[SOCKET] -  CreateGame');
		const game = await this.gamesService.createGame(roomId);
		this.server.to(roomId).emit(GATEWAY_EVENTS.CREATE_GAME, game);
	}

	public async getGame(gameId: string, roomId: string) {
		this.logger.log('[SOCKET] - GetGame');
		const game = await this.gamesService.findGameById(gameId);

		if (game.settings.state.name === ActionEnum.Start) {
			const timer = game.settings.state.timer;
			for (let i = timer; i >= 0; i--) {
				await new Promise(resolve => setTimeout(resolve, 1000));
				const res = {
					maxTime: timer,
					currentTime: i
				}
				this.server.to(roomId).emit(GATEWAY_EVENTS.GET_GAME_ACTION_TIMER, res);
			}
		}
	}

	@SubscribeMessage(GATEWAY_EVENTS.GET_GAME)
	public async subscribeGame(@MessageBody() req: string) {
		const { roomId, gameId }: HandleConnectToGameDto = JSON.parse(req);
		await this.getGame(gameId, roomId);
	}

	//SocketRoom
	@SubscribeMessage(SOCKET_ROOM_EVENTS.CREATED_SOCKET_ROOM)
	public async createRoom(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
		socket.join(data);
		this.server.to(data).emit(SOCKET_ROOM_EVENTS.CREATED_SOCKET_ROOM, data);
		this.logger.warn(`Room '${data}' - created`);
	}

	@SubscribeMessage(SOCKET_ROOM_EVENTS.JOIN_SOCKET_ROOM)
	handleRoomSocketJoin(@MessageBody() room: string, @ConnectedSocket() socket: Socket) {
		socket.join(room);
		this.server.to(room).emit(SOCKET_ROOM_EVENTS.JOIN_SOCKET_ROOM, room);
		this.logger.warn(`Client joined ${room}`);
	}

	@SubscribeMessage(SOCKET_ROOM_EVENTS.LEAVE_SOCKET_ROOM)
	handleRoomSocketLeave(@MessageBody() room: string, @ConnectedSocket() socket: Socket) {
		socket.leave(room);
		this.server.to(room).emit(SOCKET_ROOM_EVENTS.LEAVE_SOCKET_ROOM, room);
		this.logger.warn(`Client left ${room}`);
	}

	//Check
	@SubscribeMessage('message')
	message(@MessageBody() message: string): void {
		this.logger.log('[SOCKET] - message');
		this.server.emit('message', message);
	}
}
