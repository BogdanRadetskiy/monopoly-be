import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class FriendRequest {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	friendId: string;
}
