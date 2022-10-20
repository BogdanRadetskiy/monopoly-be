import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { RepositoryModule, StarsRepository } from 'src/repository';
import { FieldsRepository } from 'src/repository/repositories/fields.repository';
import { StorageService } from '../storage/storage.service';
import { StarsService } from '../stars/stars.service';

const providers = [FieldsService, FieldsRepository, StorageService, StarsService, StarsRepository];
@Module({
	imports: [RepositoryModule],
	controllers: [FieldsController],
	providers,
	exports: [...providers],
})
export class FieldsModule {}
