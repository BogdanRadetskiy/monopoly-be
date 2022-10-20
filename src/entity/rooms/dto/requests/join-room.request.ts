import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
export class JoinRoomRequest {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	roomId: string;
}
