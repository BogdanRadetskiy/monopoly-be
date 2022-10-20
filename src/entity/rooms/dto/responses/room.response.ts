import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';
import { BaseUserResponse } from 'src/entity/users/dto/responses/base-user.response';
import { Room } from '../../entities/room.entity';
import { BaseRoomResponse } from './base-room.response';

export class RoomResponse extends BaseRoomResponse {
	@ApiProperty({ type: BaseUserResponse, isArray: true })
	@Expose()
	@Type(() => BaseUserResponse)
	users: BaseUserResponse[];

	static mapFrom(room: Room): RoomResponse {
		return plainToClass(RoomResponse, room, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(rooms: Room[]): RoomResponse[] {
		return rooms.map(RoomResponse.mapFrom);
	}
}
