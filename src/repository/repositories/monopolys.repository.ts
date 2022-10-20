import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomProperty } from 'src/common';
import { MonopolyColorEnum } from 'src/common/enums/monopoly-color.enum';
import { UpdateMonopolyRequest } from 'src/entity/monopolies/dto';
import { CreateMonopolyRequest } from 'src/entity/monopolies/dto/requests/create-monopoly.request';
import { Monopoly } from 'src/entity/monopolies/entities/monopoly.entity';

@Injectable()
export class MonopolysRepository {
	constructor(
		@InjectModel(Monopoly.name)
		private monopolyModel: Model<Monopoly>
	) {}

	async create(dto: CreateMonopolyRequest): Promise<Monopoly> {
		const colors = MonopolyColorEnum;
		const randomColor = randomProperty(MonopolyColorEnum);
		delete colors[`${randomColor}`];
		const monopoly = new this.monopolyModel({ ...dto, color: randomColor });
		return this.monopolyModel.create(monopoly);
	}

	async findAll(): Promise<Monopoly[]> {
		return this.monopolyModel.find();
	}

	async findOneById(id: string): Promise<Monopoly> {
		return this.monopolyModel.findById({ _id: id });
	}

	async update(id: string, request: UpdateMonopolyRequest): Promise<Monopoly> {
		return this.monopolyModel.findByIdAndUpdate({ _id: id }, { ...request }, { new: true });
	}

	async remove(id: string): Promise<void> {
		await this.monopolyModel.findOneAndDelete({ _id: id });
	}
}
