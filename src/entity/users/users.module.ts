import { Module } from '@nestjs/common';
import { RepositoryModule, RoomsRepository } from '../../repository';
import { StorageService } from '../storage/storage.service';
import { UsersController } from './users.controller';
import { UsersRepository } from '../../repository/repositories/users.repository';
import { UsersService } from './users.service';
import { RoomsService } from '../rooms/rooms.service';

const providers = [UsersService, UsersRepository, StorageService, RoomsRepository, RoomsService];

@Module({
	imports: [RepositoryModule],
	controllers: [UsersController],
	providers,
	exports: [...providers],
})
export class UsersModule {}
