import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestled/config';
import { User } from 'src/entity/users/entities/user.entity';

@Injectable()
export class MailService {
	private clientUrl: string;
	private mailFrom: string;
	private mailEmail: string;

	constructor(private mailerService: MailerService, private readonly configService: ConfigService) {
		this.clientUrl = this.configService.get('CLIENT_URL');
		this.mailFrom = this.configService.get('MAILER_FROM');
		this.mailEmail = this.configService.get('MAILER_EMAIL');
	}

	async sendUserResetPassword(user: User) {
		const url = `${this.clientUrl}/new-password/${user.id}`;
		await this.mailerService.sendMail({
			to: user.email,
			from: `"${this.mailFrom}" <${this.mailEmail}>`,
			subject: 'Reset Your Monopoly Account Password!',
			template: './reset',
			context: {
				name: user.username,
				url,
			},
		});
	}
}
