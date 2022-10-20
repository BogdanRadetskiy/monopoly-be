import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/entity/users/entities/user.entity';
import { HttpRequestWithUser } from '../types/http-payload.types';

export const HttpUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
	const request: HttpRequestWithUser = ctx.switchToHttp().getRequest();
	return request.user;
});
