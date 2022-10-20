import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards';

export const HttpAuth = () => {
	return applyDecorators(UseGuards(JwtAuthGuard));
};
