import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting } from 'src/entity/settings/entities/setting.entity';

@Injectable()
export class SettingsRepository {
	constructor(
		@InjectModel(Setting.name)
		private settingModel: Model<Setting>
	) {}

	async create(currentPlayerId: string, actionId: string): Promise<Setting> {
		return this.settingModel.create({ state: actionId, currentPlayer: currentPlayerId });
	}

	async findAll(): Promise<Setting[]> {
		return this.settingModel.find().populate('currentPlayer').populate('state');
	}

	async findOneById(id: string): Promise<Setting> {
		return this.settingModel.findById({ _id: id }).populate('currentPlayer').populate('state');
	}

	async update(id: string, currentPlayerId: string, actionId: string): Promise<Setting> {
		return this.settingModel
			.findByIdAndUpdate({ _id: id }, { state: actionId, currentPlayer: currentPlayerId }, { new: true })
			.populate('currentPlayer')
			.populate('state');
	}

	async remove(id: string): Promise<void> {
		await this.settingModel.findOneAndDelete({ _id: id });
	}
}
