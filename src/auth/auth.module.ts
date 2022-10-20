import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './jwt/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from 'src/entity/users/users.module';
import { jwtConstants } from 'src/common';
import { UsersRepository } from '../repository/repositories/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entity/users/entities/user.entity';
import { RepositoryModule } from 'src/repository';
import { MailService } from 'src/mail/mail.service';

const providers = [AuthService, LocalStrategy, JwtStrategy, UsersRepository, MailService];

const models = [{ name: User.name, schema: UserSchema }];
@Module({
	imports: [
		MongooseModule.forFeature([...models]),
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '48h' },
		}),
		UsersModule,
		PassportModule,
		RepositoryModule,
	],
	providers,
	exports: [...providers],
	controllers: [AuthController],
})
export class AuthModule {}
