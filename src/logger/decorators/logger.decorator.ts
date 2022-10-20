import { applyDecorators, UseGuards } from '@nestjs/common';
import { LoggerGuard } from '../guards/logger.guard';

export const LoggerApi = (): ((...arg: any[]) => void) => {
	return applyDecorators(UseGuards(LoggerGuard));
};
