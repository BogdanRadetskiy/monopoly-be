import { Module } from '@nestjs/common';
import { ActionsService } from './action.service';
import { ActionsController } from './action.controller';
import { RepositoryModule, ActionsRepository } from 'src/repository';

const providers = [ActionsService, ActionsRepository];

@Module({
	imports: [RepositoryModule],
	controllers: [ActionsController],
	providers,
	exports: [...providers],
})
export class ActionsModule {}
