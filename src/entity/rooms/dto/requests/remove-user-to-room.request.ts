import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
export class RemoveUserForRoomRequest {
	@ApiProperty({ example: 'userId' })
	@Expose()
	@IsString()
	userId: string;

	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	roomId: string;
}
