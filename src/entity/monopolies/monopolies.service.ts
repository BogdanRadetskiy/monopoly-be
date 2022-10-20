import { Injectable } from '@nestjs/common';
import { MonopolysRepository } from 'src/repository';
import { MonopolyResponse, UpdateMonopolyRequest } from './dto';
import { CreateMonopolyRequest } from './dto/requests/create-monopoly.request';
@Injectable()
export class MonopolyesService {
	constructor(private monopolysRepository: MonopolysRepository) {}

	async createMonopoly(dto: CreateMonopolyRequest): Promise<MonopolyResponse> {
		return this.monopolysRepository.create(dto);
	}

	async findAllMonopolyes(): Promise<MonopolyResponse[]> {
		return this.monopolysRepository.findAll().then(MonopolyResponse.mapFromMulti);
	}

	async findMonopolyById(id: string): Promise<MonopolyResponse> {
		return await this.monopolysRepository.findOneById(id).then(MonopolyResponse.mapFrom);
	}

	async updateMonopoly(id: string, request: UpdateMonopolyRequest): Promise<MonopolyResponse> {
		return this.monopolysRepository.update(id, request).then(MonopolyResponse.mapFrom);
	}

	async removeMonopoly(id: string): Promise<void> {
		await this.monopolysRepository.remove(id);
	}
}
