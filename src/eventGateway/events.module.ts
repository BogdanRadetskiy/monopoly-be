import { Global, Module } from '@nestjs/common';
import { ActionsService } from 'src/entity/action/action.service';
import { ChancesService } from 'src/entity/chances/chances.service';
import { GamesService } from 'src/entity/games/games.service';
import { PlayersService } from 'src/entity/players/players.service';
import { RoomsService } from 'src/entity/rooms/rooms.service';
import { SettingsService } from 'src/entity/settings/setting.service';
import { StorageService } from 'src/entity/storage/storage.service';
import { UsersService } from 'src/entity/users/users.service';
import { RepositoryModule } from 'src/repository';
import { EventGateway } from './event.gateway';

const providers = [
	EventGateway,
	RoomsService,
	GamesService,
	PlayersService,
	SettingsService,
	ActionsService,
	ChancesService,
	UsersService,
	StorageService,
];
@Global()
@Module({
	imports: [RepositoryModule],
	controllers: [],
	providers,
	exports: [...providers],
})
export class EventsModule {}
