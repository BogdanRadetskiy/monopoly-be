import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpUser } from 'src/common';
import { UserResponse } from 'src/entity/users/dto';
import { User } from 'src/entity/users/entities/user.entity';
import { LoggerApi } from 'src/logger';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { ResetPasswordRequest } from './dto/requests';
import { ChangePasswordRequest } from './dto/requests/change-password.request';
import { ForgotPasswordRequest } from './dto/requests/forgot-password.request';
import { VerifyDto } from './dto/verify.dto';

@Controller('auth')
@ApiTags('auth')
@LoggerApi()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	@ApiOperation({ summary: '[Login]', description: 'login' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: LoginResponse })
	async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
		return this.authService
			.validateUser(loginDto.email, loginDto.password)
			.then(user => LoginResponse.mapFrom(user));
	}

	@Post('/registration')
	@ApiOperation({ summary: '[Registration]', description: 'registration' })
	@HttpCode(HttpStatus.CREATED)
	@ApiResponse({ type: LoginResponse })
	async registration(@Body() registrationDto: RegistrationDto): Promise<LoginResponse> {
		return this.authService.register(registrationDto).then(user => LoginResponse.mapFrom(user));
	}

	@Post('/verify')
	@ApiOperation({ summary: '[Verify]', description: 'verify' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	@ApiResponse({ type: LoginResponse })
	@UseGuards(AuthGuard('jwt'))
	async verify(@Request() { user }: { user: VerifyDto }): Promise<UserResponse> {
		return this.authService.verify(user.id).then(user => UserResponse.mapFrom(user));
	}

	@Post('/forgot-password')
	@ApiOperation({ summary: '[ForgotPassword]', description: 'forgot password' })
	@HttpCode(HttpStatus.OK)
	async forgotPassword(@Body() request: ForgotPasswordRequest) {
		return this.authService.forgotPassword(request);
	}

	@Post('/reset-password')
	@ApiOperation({ summary: '[ResetPassword]', description: 'reset password' })
	@HttpCode(HttpStatus.OK)
	async resetPassword(@Body() request: ResetPasswordRequest) {
		return this.authService.resetPassword(request);
	}

	@Post('/change-password')
	@ApiOperation({ summary: '[ChangePassword]', description: 'Change password' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	async changePassword(@Body() request: ChangePasswordRequest, @HttpUser() user: User) {
		return this.authService.changePassword(request, user.id);
	}
}
