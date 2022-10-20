import { Injectable, CanActivate, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/entity/users/users.service';
import { jwtDecoded } from '../helpers';

@Injectable()
export class WsGuard implements CanActivate {
	constructor(private readonly usersService: UsersService) {}
	async canActivate(context: any): Promise<boolean> {
		const auth = context.args[0].handshake.headers.authorization;
		if (!auth) {
			throw new UnauthorizedException();
		}
		try {
			const decoded = jwtDecoded(auth);
			return new Promise((resolve, reject) => {
				return this.usersService.getUserByUserName(decoded.username).then(user => {
					if (user) {
						resolve(true);
					} else {
						reject(false);
					}
				});
			});
		} catch (ex) {
			console.log(ex);
			return false;
		}
	}
}
