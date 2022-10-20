import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: 'smtp.gmail.com',
				port: 465,
				auth: {
					user: 'monopolyspprt@gmail.com',
					pass: 'zgeplgtfugobziyx',
				},
			},
			defaults: {
				from: '"Support Team" <monopolyspprt@gmail.com>',
			},
			template: {
				dir: join(__dirname, '/templates'),
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
