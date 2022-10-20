import { Controller, Get, Body, Patch, Param, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi } from 'src/logger';
import { ChancesService } from './chances.service';
import { CreateChanceRequest, UpdateChanceRequest, ChanceResponse } from './dto';

@Controller('chances')
@ApiTags('chances')
@ApiBearerAuth()
@LoggerApi()
export class ChancesController {
	constructor(private readonly chancesService: ChancesService) {}

	@Post()
	@ApiOperation({ summary: '[CreateChance]', description: 'create chance' })
	@ApiResponse({ type: ChanceResponse })
	@HttpCode(HttpStatus.CREATED)
	async createChance(@Body() request: CreateChanceRequest): Promise<ChanceResponse> {
		return this.chancesService.createChance(request);
	}

	@Get()
	@ApiOperation({ summary: '[GetAllChances]', description: 'get all chances' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: ChanceResponse, isArray: true })
	async findAllChances(): Promise<ChanceResponse[]> {
		return this.chancesService.findAllChances();
	}

	@Get(':id')
	@ApiOperation({ summary: '[GetChance]', description: 'get chance' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: ChanceResponse })
	async findChanceById(@Param('id') id: string): Promise<ChanceResponse> {
		return this.chancesService.findChanceById(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: '[UpdateChance]', description: 'update chance' })
	@ApiResponse({ type: ChanceResponse })
	@HttpCode(HttpStatus.OK)
	async updateChance(@Body() request: UpdateChanceRequest, @Param('id') id: string): Promise<ChanceResponse> {
		return this.chancesService.updateChance(id, request);
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteChance]', description: 'delete chance' })
	@HttpCode(HttpStatus.OK)
	async removeChance(@Param('id') id: string): Promise<void> {
		await this.chancesService.removeChance(id);
	}
}
