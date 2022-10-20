import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFieldRequest, UpdateFieldRequest } from 'src/entity/fields/dto';
import { Field } from 'src/entity/fields/entities/field.entity';

@Injectable()
export class FieldsRepository {
	constructor(
		@InjectModel(Field.name)
		private fieldModel: Model<Field>
	) {}

	async createInstance(createFieldDto: CreateFieldRequest): Promise<Field> {
		return new this.fieldModel(createFieldDto);
	}

	async findOneById(id: string): Promise<Field> {
		return this.fieldModel.findById({ _id: id }).populate({
			path: 'stars',
			model: 'Star',
		});
	}

	async update(id: string, request: UpdateFieldRequest): Promise<Field> {
		return await this.fieldModel.findByIdAndUpdate({ _id: id }, { ...request }, { new: true });
	}

	async findAll(): Promise<Field[]> {
		return this.fieldModel.find();
	}

	async findAllByCustom(): Promise<Field[]> {
		return this.fieldModel.find({ isCustom: false });
	}

	async remove(id: string): Promise<void> {
		await this.fieldModel.findOneAndDelete({ _id: id });
	}
}
