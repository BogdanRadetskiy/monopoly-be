import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ActionResponse } from 'src/entity/action/dto';
import { PlayerResponse } from 'src/entity/players/dto';
import { Setting } from '../../entities/setting.entity';

export class SettingResponse {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	id: string;

	@ApiProperty({ type: ActionResponse })
	@Expose()
	@Type(() => ActionResponse)
	state: ActionResponse;

	@ApiProperty({ type: PlayerResponse })
	@Expose()
	@Type(() => PlayerResponse)
	currentPlayer: PlayerResponse;

	@ApiProperty({ example: '{description: text}' })
	@Expose()
	@IsOptional()
	additionalInformation: any;

	@ApiProperty({ example: 30 })
	@Expose()
	@IsNumber()
	timer: number;

	static mapFrom(setting: Setting): SettingResponse {
		return plainToClass(SettingResponse, setting, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(settings: Setting[]): SettingResponse[] {
		return settings.map(SettingResponse.mapFrom);
	}
}
