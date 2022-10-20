import { get } from '@nestled/config/lib/validate';

export const jwtConstants = (): string => get('SECRET').asString();
