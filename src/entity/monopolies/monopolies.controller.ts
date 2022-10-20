import { Controller, Get, Body, Patch, Param, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MonopolyesService } from './monopolies.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi } from 'src/logger';
import { MonopolyResponse, UpdateMonopolyRequest } from './dto';
import { CreateMonopolyRequest } from './dto/requests/create-monopoly.request';
@Controller('monopolies')
@ApiTags('monopolies')
@ApiBearerAuth()
@LoggerApi()
export class MonopolyesController {
	constructor(private readonly monopoliesService: MonopolyesService) {}

	@Post()
	@ApiOperation({ summary: '[CreateMonopoly]', description: 'create monopoly' })
	@ApiResponse({ type: MonopolyResponse })
	@HttpCode(HttpStatus.CREATED)
	async createMonopoly(@Body() request: CreateMonopolyRequest): Promise<MonopolyResponse> {
		return this.monopoliesService.createMonopoly(request);
	}

	@Get()
	@ApiOperation({ summary: '[GetAllMonopolyes]', description: 'get all monopolyes' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: MonopolyResponse, isArray: true })
	async findAllMonopolyes(): Promise<MonopolyResponse[]> {
		return this.monopoliesService.findAllMonopolyes();
	}

	@Get(':id')
	@ApiOperation({ summary: '[GetMonopoly]', description: 'get monopoly' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: MonopolyResponse })
	async findMonopolyById(@Param('id') id: string): Promise<MonopolyResponse> {
		return this.monopoliesService.findMonopolyById(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: '[UpdateMonopoly]', description: 'update monopoly' })
	@ApiResponse({ type: MonopolyResponse })
	@HttpCode(HttpStatus.OK)
	async updateMonopoly(@Body() request: UpdateMonopolyRequest, @Param('id') id: string): Promise<MonopolyResponse> {
		return this.monopoliesService.updateMonopoly(id, request);
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteMonopoly]', description: 'delete monopoly' })
	@HttpCode(HttpStatus.OK)
	async removeMonopoly(@Param('id') id: string): Promise<void> {
		await this.monopoliesService.removeMonopoly(id);
	}
}
