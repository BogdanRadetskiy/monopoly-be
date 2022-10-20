import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chance } from 'src/entity/chances/entities/chance.entity';
import { CreateChanceRequest, UpdateChanceRequest } from 'src/entity/chances/dto';

@Injectable()
export class ChancesRepository {
	constructor(
		@InjectModel(Chance.name)
		private chanceModel: Model<Chance>
	) {}

	async create(dto: CreateChanceRequest): Promise<Chance> {
		const chance = new this.chanceModel({ ...dto });
		return this.chanceModel.create(chance);
	}

	async findAll(): Promise<Chance[]> {
		return this.chanceModel.find();
	}

	async findOneById(id: string): Promise<Chance> {
		return this.chanceModel.findById({ _id: id });
	}

	async update(id: string, request: UpdateChanceRequest): Promise<Chance> {
		return this.chanceModel.findByIdAndUpdate({ _id: id }, { ...request }, { new: true });
	}

	async remove(id: string): Promise<void> {
		await this.chanceModel.findOneAndDelete({ _id: id });
	}
}
