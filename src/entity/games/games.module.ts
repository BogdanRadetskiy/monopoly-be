import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';
import { GamesRepository } from 'src/repository/repositories/games.repository';
import { ActionsService } from '../action/action.service';
import { PlayersService } from '../players/players.service';
import { RoomsService } from '../rooms/rooms.service';
import { SettingsService } from '../settings/setting.service';
import { StorageService } from '../storage/storage.service';
import { UsersService } from '../users/users.service';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { ChancesService } from '../chances/chances.service';

const providers = [
	GamesService,
	UsersService,
	GamesRepository,
	StorageService,
	RoomsService,
	PlayersService,
	SettingsService,
	ActionsService,
	ChancesService,
];

@Module({
	imports: [RepositoryModule],
	controllers: [GamesController],
	providers,
	exports: [...providers],
})
export class GamesModule {}
