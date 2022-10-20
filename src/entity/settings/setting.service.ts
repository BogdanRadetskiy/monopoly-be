import { Injectable } from '@nestjs/common';
import { ActionEnum } from 'src/common';
import { SettingsRepository } from 'src/repository';
import { ActionsService } from '../action/action.service';
import { ChancesService } from '../chances/chances.service';
import { CreateSettingRequest, SettingResponse, UpdateSettingRequest } from './dto';

@Injectable()
export class SettingsService {
	constructor(
		private settingsRepository: SettingsRepository,
		private actionsService: ActionsService,
		private chancesService: ChancesService
	) {}

	async createSetting(request: CreateSettingRequest): Promise<SettingResponse> {
		const defaultActions = await this.actionsService.findActionByName(ActionEnum.Start);
		const createdSetting = await this.settingsRepository.create(request.currentPlayerId, defaultActions.id);
		return this.settingsRepository.findOneById(createdSetting._id).then(SettingResponse.mapFrom);
	}

	async findAllSettings(): Promise<SettingResponse[]> {
		return this.settingsRepository.findAll().then(SettingResponse.mapFromMulti);
	}

	async findSettingById(id: string): Promise<SettingResponse> {
		return this.settingsRepository.findOneById(id).then(SettingResponse.mapFrom);
	}

	async updateSetting(id: string, request: UpdateSettingRequest): Promise<SettingResponse> {
		const actions = await this.actionsService.findActionByName(request.state);
		const updatedSetting = await this.settingsRepository
			.update(id, request.currentPlayerId, actions.id)
			.then(SettingResponse.mapFrom);

		if (actions.name === ActionEnum.Chance) {
			const allChances = await this.chancesService.findAllChances();
			const chance = allChances[Math.floor(Math.random() * allChances.length)];
			updatedSetting.additionalInformation = chance;
		}

		return updatedSetting;
	}

	async removeSetting(id: string): Promise<void> {
		await this.settingsRepository.remove(id);
	}
}
