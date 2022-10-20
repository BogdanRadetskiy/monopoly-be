import { Injectable, NotFoundException } from '@nestjs/common';
import { ActionsRepository } from 'src/repository';
import { ActionDto, ActionResponse, UpdateActionRequest } from './dto';
import { Action } from './entities/action.entity';

@Injectable()
export class ActionsService {
	constructor(private actionsRepository: ActionsRepository) {}

	async createAction(createActionDto: ActionDto): Promise<ActionResponse> {
		return this.actionsRepository.create(createActionDto).then(ActionResponse.mapFrom);
	}

	async findAllActions(): Promise<ActionResponse[]> {
		return this.actionsRepository.findAll().then(ActionResponse.mapFromMulti);
	}

	async findActionById(id: string): Promise<ActionResponse> {
		return this.actionsRepository.findOneById(id).then(ActionResponse.mapFrom);
	}

	async findActionByName(name: string): Promise<Action> {
		const action = await this.actionsRepository.findOneByName(name);
		if (!action) {
			throw new NotFoundException(`${name} state not found`);
		}
		return action;
	}

	async updateAction(id: string, request: UpdateActionRequest): Promise<ActionResponse> {
		return this.actionsRepository.update(id, request).then(ActionResponse.mapFrom);
	}

	async removeAction(id: string): Promise<void> {
		await this.actionsRepository.remove(id);
	}
}
