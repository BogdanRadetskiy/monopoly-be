import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { Action } from '../../entities/action.entity';
import { ActionDto } from '../action.dto';

export class ActionResponse extends ActionDto {
	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	id: string;

	static mapFrom(action: Action): ActionResponse {
		return plainToClass(ActionResponse, action, {
			excludeExtraneousValues: true,
		});
	}

	static mapFromMulti(actions: Action[]): ActionResponse[] {
		return actions.map(ActionResponse.mapFrom);
	}
}
