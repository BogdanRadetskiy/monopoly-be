import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LoggerApiService } from '../services/logger.service';

@Injectable()
export class LoggerGuard implements CanActivate {
	constructor(private readonly loggerApiService: LoggerApiService, private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const className = context.getClass().name;
		const request = context.switchToHttp().getRequest();
		const type = this.reflector.getAllAndOverride('loggerType', [context.getHandler(), context.getClass()]);
		const methodKey = context.getHandler().name;

		const data = {
			type,
			className,
			methodKey,
			request,
		};
		await this.loggerApiService.log(data);
		return true;
	}
}
