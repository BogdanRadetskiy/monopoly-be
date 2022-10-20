import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateGameRequest {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	roomId: string;
}
