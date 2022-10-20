import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggerApiService {
	private logger: LoggerService;

	async log(data) {
		this.logger = new Logger(data.className);
		const request = {
			params: data.request.params,
			query: data.request.query,
			body: data.request.body,
			path: data.request.path,
			methodKey: data.methodKey,
		};
		await this.defaultLog(request.methodKey);
	}

	async defaultLog(methodKey: string) {
		this.logger.log(` ${methodKey}`);
	}
}
