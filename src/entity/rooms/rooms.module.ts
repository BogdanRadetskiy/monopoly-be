import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RepositoryModule, RoomsRepository } from '../../repository';
import { UsersRepository } from '../../repository/repositories/users.repository';
import { UsersService } from '../users/users.service';
import { StorageService } from '../storage/storage.service';

const providers = [RoomsService, RoomsRepository, UsersRepository, UsersService, StorageService];

@Module({
	imports: [RepositoryModule],
	controllers: [RoomsController],
	providers,
	exports: [...providers],
})
export class RoomsModule {}
