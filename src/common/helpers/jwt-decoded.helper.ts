import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../constans';

export const jwtDecoded = (auth: string) => {
	const bearerToken = auth.split(' ')[1];
	return jwt.verify(bearerToken, jwtConstants.secret) as any;
};
