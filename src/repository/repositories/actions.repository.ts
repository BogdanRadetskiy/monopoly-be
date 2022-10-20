import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActionEnum } from 'src/common';
import { ActionDto, UpdateActionRequest } from 'src/entity/action/dto';
import { Action } from 'src/entity/action/entities/action.entity';

@Injectable()
export class ActionsRepository {
	constructor(
		@InjectModel(Action.name)
		private actionModel: Model<Action>
	) {}

	async create(createActionDto: ActionDto): Promise<Action> {
		const createdAction = new this.actionModel(createActionDto);
		return createdAction.save();
	}

	async findAll(): Promise<Action[]> {
		return this.actionModel.find();
	}

	async findOneById(id: string): Promise<Action> {
		return this.actionModel.findById({ _id: id });
	}

	async findOneByName(action: string): Promise<Action> {
		return this.actionModel.findOne({ name: ActionEnum[action] });
	}

	async update(id: string, request: UpdateActionRequest): Promise<Action> {
		return this.actionModel.findByIdAndUpdate({ _id: id }, { ...request }, { new: true });
	}

	async remove(id: string): Promise<void> {
		await this.actionModel.findOneAndDelete({ _id: id });
	}
}
