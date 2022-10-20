import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class PlayerDto {
	@ApiProperty({ example: true })
	@Expose()
	@IsBoolean()
	moneyCount: number;

	@ApiProperty({ example: 'string' })
	@Expose()
	@IsString()
	color: string;
}
