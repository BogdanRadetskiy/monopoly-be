import { Injectable } from '@nestjs/common';
import { ChancesRepository } from 'src/repository';
import { CreateChanceRequest, UpdateChanceRequest, ChanceResponse } from './dto';
import { prepareDataToUpdate } from '../../common/helpers/prepare-data-to-update.helper';

@Injectable()
export class ChancesService {
	constructor(private chancesRepository: ChancesRepository) {}

	async createChance(dto: CreateChanceRequest): Promise<ChanceResponse> {
		return this.chancesRepository.create(dto);
	}

	async findAllChances(): Promise<ChanceResponse[]> {
		return this.chancesRepository.findAll().then(ChanceResponse.mapFromMulti);
	}

	async findChanceById(id: string): Promise<ChanceResponse> {
		return await this.chancesRepository.findOneById(id).then(ChanceResponse.mapFrom);
	}

	async updateChance(id: string, request: UpdateChanceRequest): Promise<ChanceResponse> {
		return this.chancesRepository.update(id, prepareDataToUpdate(request)).then(ChanceResponse.mapFrom);
	}

	async removeChance(id: string): Promise<void> {
		await this.chancesRepository.remove(id);
	}
}
