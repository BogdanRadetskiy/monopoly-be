import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { CreateSettingRequest } from './create-setting.request';

export class UpdateSettingRequest extends CreateSettingRequest {
	@ApiProperty({ example: 'Default' })
	@Expose()
	@IsString()
	state: string;
}
