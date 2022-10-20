import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StarDto, UpdateStarRequest } from 'src/entity/stars/dto';
import { Star } from 'src/entity/stars/entities/star.entity';

@Injectable()
export class StarsRepository {
	constructor(
		@InjectModel(Star.name)
		private starModel: Model<Star>
	) {}

	async createMulti(stars: StarDto[], fieldId: string): Promise<Star[]> {
		const newStars = stars.map(star => {
			return new this.starModel({ ...star, fieldId });
		});
		return this.starModel.create(newStars);
	}

	async findAll(): Promise<Star[]> {
		return this.starModel.find();
	}

	async findOneById(id: string): Promise<Star> {
		return this.starModel.findById({ _id: id });
	}

	async update(id: string, request: UpdateStarRequest): Promise<Star> {
		return this.starModel.findByIdAndUpdate({ _id: id }, { ...request }, { new: true });
	}

	async remove(id: string): Promise<void> {
		await this.starModel.findOneAndDelete({ _id: id });
	}
}
