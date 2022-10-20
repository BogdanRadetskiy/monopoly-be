import { Module } from '@nestjs/common';
import { StarsService } from './stars.service';
import { StarsController } from './stars.controller';
import { RepositoryModule, StarsRepository } from 'src/repository';

const providers = [StarsService, StarsRepository];

@Module({
	imports: [RepositoryModule],
	controllers: [StarsController],
	providers,
	exports: [...providers],
})
export class StarsModule {}
