import { Controller, Get, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { StarsService } from './stars.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi } from 'src/logger';
import { StarResponse, UpdateStarRequest } from './dto';

@Controller('stars')
@ApiTags('stars')
@ApiBearerAuth()
@LoggerApi()
export class StarsController {
	constructor(private readonly starsService: StarsService) {}

	@Get()
	@ApiOperation({ summary: '[GetAllStars]', description: 'get all star' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: StarResponse, isArray: true })
	async findAllStars(): Promise<StarResponse[]> {
		return this.starsService.findAllStars();
	}

	@Get(':id')
	@ApiOperation({ summary: '[GetStar]', description: 'get star' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: StarResponse })
	async findStarById(@Param('id') id: string): Promise<StarResponse> {
		return this.starsService.findStarById(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: '[UpdateStar]', description: 'update star' })
	@ApiResponse({ type: StarResponse })
	@HttpCode(HttpStatus.OK)
	async updateStar(@Body() request: UpdateStarRequest, @Param('id') id: string): Promise<StarResponse> {
		return this.starsService.updateStar(id, request);
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteStar]', description: 'delete star' })
	@HttpCode(HttpStatus.OK)
	async removeStar(@Param('id') id: string): Promise<void> {
		await this.starsService.removeStar(id);
	}
}
