import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Module
import { UsersModule } from './entity/users/users.module';
import { RoomsModule } from './entity/rooms/rooms.module';
import { AuthModule } from './auth/auth.module';
import { FieldsModule } from './entity/fields/fields.module';
import { PlayersModule } from './entity/players/players.module';
import { StarsModule } from './entity/stars/stars.module';
import { MonopoliesModule } from './entity/monopolies/monopolies.module';
import { ConfigModule } from '@nestled/config';
import { GamesModule } from './entity/games/games.module';
import { MailModule } from './mail/mail.module';
import { RepositoryModule } from './repository';
import { EventsModule } from './eventGateway/events.module';
import { ChancesModule } from './entity/chances/chances.module';
import { ActionsModule } from './entity/action/action.module';
import { SettingsModule } from './entity/settings/setting.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.dbURL),
		AuthModule,
		UsersModule,
		RoomsModule,
		FieldsModule,
		PlayersModule,
		StarsModule,
		MonopoliesModule,
		GamesModule,
		MailModule,
		EventsModule,
		RepositoryModule,
		GamesModule,
		ChancesModule,
		ActionsModule,
		SettingsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
