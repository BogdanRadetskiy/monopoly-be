import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { RoomDto } from '../room.dto';

export class CreateRoomRequest extends RoomDto {
	@ApiProperty({ example: 'id' })
	@Expose()
	@IsString()
	host: string;

	@ApiProperty({ example: 'name' })
	@Expose()
	@IsString()
	hostName: string;

	@ApiProperty({ example: 'id', isArray: true })
	@Expose()
	@IsString()
	users: string[];
}
