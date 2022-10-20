import { Injectable } from '@nestjs/common';
import { StarsRepository } from 'src/repository';
import { StarDto, StarResponse, UpdateStarRequest } from './dto';
import { Star } from './entities/star.entity';

@Injectable()
export class StarsService {
	constructor(private starsRepository: StarsRepository) {}

	async createStars(stars: StarDto[], fieldId: string): Promise<Star[]> {
		return this.starsRepository.createMulti(stars, fieldId);
	}

	async findAllStars(): Promise<StarResponse[]> {
		return this.starsRepository.findAll().then(StarResponse.mapFromMulti);
	}

	async findStarById(id: string): Promise<StarResponse> {
		return await this.starsRepository.findOneById(id).then(StarResponse.mapFrom);
	}

	async updateStar(id: string, request: UpdateStarRequest): Promise<StarResponse> {
		return this.starsRepository.update(id, request).then(StarResponse.mapFrom);
	}

	async removeStar(id: string): Promise<void> {
		await this.starsRepository.remove(id);
	}
}
