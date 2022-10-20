import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { RepositoryModule } from 'src/repository/repository.module';

const providers = [PlayersService];

@Module({
	imports: [RepositoryModule],
	controllers: [PlayersController],
	providers,
	exports: [...providers],
})
export class PlayersModule {}
