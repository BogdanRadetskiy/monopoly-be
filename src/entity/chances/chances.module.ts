import { Module } from '@nestjs/common';
import { ChancesRepository, RepositoryModule } from 'src/repository';
import { ChancesController } from './chances.controller';
import { ChancesService } from './chances.service';

const providers = [ChancesService, ChancesRepository];

@Module({
	imports: [RepositoryModule],
	controllers: [ChancesController],
	providers,
	exports: [...providers],
})
export class ChancesModule {}
