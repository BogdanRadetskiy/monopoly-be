import { Injectable, NotFoundException } from '@nestjs/common';
import { ImageDataType } from 'src/common/interface/upload.interface';
import { FieldsRepository } from 'src/repository/repositories/fields.repository';
import { StarsService } from '../stars/stars.service';
import { StorageService } from '../storage/storage.service';
import { CreateFieldRequest, FieldResponse, UpdateFieldRequest } from './dto';
import { Field } from './entities/field.entity';
@Injectable()
export class FieldsService {
	constructor(
		private fieldsRepository: FieldsRepository,
		private readonly storageService: StorageService,
		private readonly starsService: StarsService
	) {}

	async createField(createFieldDto: CreateFieldRequest, fileData: ImageDataType): Promise<FieldResponse> {
		const file = await this.storageService.save(fileData);
		createFieldDto.avatar = file.url;
		const field = await this.fieldsRepository.createInstance(createFieldDto);
		const stars = await this.starsService.createStars(createFieldDto.stars, field._id);
		field.stars = stars;
		await field.save();
		return this.findFieldById(field._id.toString()).then(FieldResponse.mapFrom);
	}

	async findAllFields(): Promise<FieldResponse[]> {
		return this.fieldsRepository.findAll().then(FieldResponse.mapFromMulti);
	}

	async findFieldById(id: string): Promise<Field> {
		let field;
		try {
			field = await this.fieldsRepository.findOneById(id);
		} catch {
			throw new NotFoundException(`There isn't any field with id: ${id}`);
		}
		return field;
	}

	async updateField(id: string, request: UpdateFieldRequest): Promise<FieldResponse> {
		return this.fieldsRepository.update(id, request).then(FieldResponse.mapFrom);
	}

	async removeField(id: string): Promise<void> {
		await this.fieldsRepository.remove(id);
	}
}
