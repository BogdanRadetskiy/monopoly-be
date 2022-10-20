import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ImageRequest {
	@ApiPropertyOptional({ type: 'string', format: 'binary' })
	@IsOptional()
	image: string;
}
