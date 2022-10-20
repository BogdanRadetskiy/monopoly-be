import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Action, ActionSchema } from 'src/entity/action/entities/action.entity';
import { Chance, ChanceSchema } from 'src/entity/chances/entities/chance.entity';
import { Field, FieldSchema } from 'src/entity/fields/entities/field.entity';
import { Game, GameSchema } from 'src/entity/games/entities/game.entity';
import { Monopoly, MonopolySchema } from 'src/entity/monopolies/entities/monopoly.entity';
import { Player, PlayerSchema } from 'src/entity/players/entities/player.entity';
import { Room, RoomSchema } from 'src/entity/rooms/entities/room.entity';
import { Setting, SettingSchema } from 'src/entity/settings/entities/setting.entity';
import { Star, StarSchema } from 'src/entity/stars/entities/star.entity';
import { User, UserSchema } from 'src/entity/users/entities/user.entity';
import { LoggerApiService } from 'src/logger/services/logger.service';
import {
	UsersRepository,
	RoomsRepository,
	PlayersRepository,
	SettingsRepository,
	ActionsRepository,
	ChancesRepository,
	FieldsRepository,
	GamesRepository,
} from './repositories';

const providers = [
	UsersRepository,
	RoomsRepository,
	PlayersRepository,
	LoggerApiService,
	SettingsRepository,
	ActionsRepository,
	ChancesRepository,
	FieldsRepository,
	GamesRepository,
];

const models = [
	{ name: User.name, schema: UserSchema },
	{ name: Room.name, schema: RoomSchema },
	{ name: Player.name, schema: PlayerSchema },
	{ name: Game.name, schema: GameSchema },
	{ name: Field.name, schema: FieldSchema },
	{ name: Monopoly.name, schema: MonopolySchema },
	{ name: Star.name, schema: StarSchema },
	{ name: Chance.name, schema: ChanceSchema },
	{ name: Action.name, schema: ActionSchema },
	{ name: Setting.name, schema: SettingSchema },
];
@Global()
@Module({
	imports: [MongooseModule.forFeature([...models])],
	controllers: [],
	providers,
	exports: [...providers, MongooseModule.forFeature([...models])],
})
export class RepositoryModule {}
