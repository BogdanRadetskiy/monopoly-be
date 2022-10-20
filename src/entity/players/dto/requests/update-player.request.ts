import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
export class UpdatePlayerRequest {
	@ApiPropertyOptional({ example: '1' })
	@IsOptional()
	@Expose()
	@IsNumber()
	currentFieldPosition: number;
}
