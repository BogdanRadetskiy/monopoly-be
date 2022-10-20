import { hash } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => await hash(password, 10);
