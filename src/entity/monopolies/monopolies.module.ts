import { Module } from '@nestjs/common';
import { MonopolyesService } from './monopolies.service';
import { MonopolyesController } from './monopolies.controller';
import { MonopolysRepository, RepositoryModule } from 'src/repository';
import { GamesRepository } from 'src/repository/repositories/games.repository';

const providers = [MonopolyesService, MonopolysRepository, GamesRepository];

@Module({
	imports: [RepositoryModule],
	controllers: [MonopolyesController],
	providers,
	exports: [...providers],
})
export class MonopoliesModule {}
