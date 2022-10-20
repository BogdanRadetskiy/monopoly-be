import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { RoomDto } from '../room.dto';

export class BaseRoomResponse extends RoomDto {
	@ApiPropertyOptional({ example: 'string' })
	@IsOptional()
	@Expose()
	@IsString()
	id?: string;

	@ApiProperty({ example: 'id' })
	@Expose()
	@IsString()
	host: string;

	@ApiProperty({ example: 'name' })
	@Expose()
	@IsString()
	hostName: string;
}
