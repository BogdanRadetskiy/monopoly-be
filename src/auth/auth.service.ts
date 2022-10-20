import {
	BadRequestException,
	ConflictException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isMatch } from 'src/core/utils/compare-hash.utils';
import { hashPassword } from 'src/core/utils/hash.utils';
import { UsersRepository } from 'src/repository/repositories/users.repository';
import { UsersService } from 'src/entity/users/users.service';
import { RegistrationDto } from './dto/registration.dto';
import { MailService } from 'src/mail/mail.service';
import { ForgotPasswordRequest } from './dto/requests/forgot-password.request';
import { ResetPasswordRequest } from './dto/requests';
import { ChangePasswordRequest } from './dto/requests/change-password.request';
import { User } from 'src/entity/users/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly usersRepository: UsersRepository,
		private readonly mailService: MailService
	) {}

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.usersRepository.findOneByEmail(email);
		if (!user) {
			throw new NotFoundException('Email not fount');
		}
		const isCheckPassword = await isMatch(password, user.password);
		if (!isCheckPassword) {
			throw new BadRequestException('Password not valid');
		}
		const accessToken = await this.getAccessToken(user);
		user.token = accessToken;
		user.password = undefined;
		return user;
	}

	async getAccessToken(user: User) {
		const payload = { username: user.username, id: user._id };
		return this.jwtService.signAsync(payload);
	}

	async register(user: RegistrationDto) {
		const existEmail = await this.usersRepository.findOneByEmail(user.email);
		if (existEmail) {
			throw new ConflictException(`User with ${user.email} email already exist`);
		}
		const existName = await this.usersRepository.findOneByUsername(user.username);
		if (existName) {
			throw new ConflictException(`User with ${user.username} email already exist`);
		}
		try {
			user.email && (user.email = user.email.toLowerCase().trim());
			user.password && (user.password = await hashPassword(user.password));
			const createdUser = await this.usersService.createUser(user);
			const accessToken = await this.getAccessToken(createdUser);
			createdUser.token = accessToken;
			return createdUser;
		} catch (error) {
			console.warn('error: ', error);
			throw new HttpException(`Registration problem when creating user.`, HttpStatus.FORBIDDEN);
		}
	}

	async verify(id: string) {
		try {
			return this.usersRepository.findOneById(id);
		} catch (error) {
			throw new HttpException(
				{ error: 'Username not found.', message: 'Not valid username or password.' },
				HttpStatus.FORBIDDEN
			);
		}
	}

	async forgotPassword(req: ForgotPasswordRequest) {
		const user = await this.usersRepository.findOneByEmail(req.email);
		if (!user) {
			throw new NotFoundException('Email not fount');
		}
		await this.mailService.sendUserResetPassword(user);
	}

	async resetPassword(req: ResetPasswordRequest) {
		const user = await this.usersService.getUserById(req.id);
		user.password = await hashPassword(req.password);
		user.save();
	}

	async changePassword(req: ChangePasswordRequest, userId: string) {
		const user = await this.usersService.getUserById(userId);
		const isCheckPassword = await isMatch(req.oldPassword, user.password);
		if (!isCheckPassword) {
			throw new BadRequestException('Password not valid');
		}
		user.password = await hashPassword(req.newPassword);
		user.save();
	}
}
