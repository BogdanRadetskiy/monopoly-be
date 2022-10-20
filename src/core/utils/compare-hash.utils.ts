import { compare } from 'bcrypt';

export const isMatch = async (password: string, hash: string) => await compare(password, hash);
