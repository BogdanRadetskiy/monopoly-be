import { Global, Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';
import { LoggerApiService } from './services/logger.service';

const providers = [LoggerApiService];

@Global()
@Module({
	imports: [RepositoryModule],
	providers: [...providers],
	exports: [...providers],
})
export class LoggerModule {}
