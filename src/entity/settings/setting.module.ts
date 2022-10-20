import { Module } from '@nestjs/common';
import { SettingsService } from './setting.service';
import { SettingsController } from './setting.controller';
import { RepositoryModule } from 'src/repository';
import { ActionsService } from '../action/action.service';
import { ChancesService } from '../chances/chances.service';

const providers = [SettingsService, ActionsService, ChancesService];

@Module({
	imports: [RepositoryModule],
	controllers: [SettingsController],
	providers,
	exports: [...providers],
})
export class SettingsModule {}
