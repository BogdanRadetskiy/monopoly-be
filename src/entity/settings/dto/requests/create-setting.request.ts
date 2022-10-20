import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateSettingRequest {
	@ApiProperty({ example: 'id' })
	@Expose()
	@IsString()
	currentPlayerId: string;
}
