import { Controller, Get, Param, Delete, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi } from 'src/logger';
import { CreateGameRequest, GameResponse } from './dto';
import { GamesService } from './games.service';

@Controller('game')
@ApiTags('game')
@LoggerApi()
@ApiBearerAuth()
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@Post()
	@ApiOperation({ summary: '[CreateGame]', description: 'create game' })
	@ApiResponse({ type: GameResponse })
	@HttpCode(HttpStatus.CREATED)
	async createGame(@Body() request: CreateGameRequest): Promise<GameResponse> {
		return this.gamesService.createGame(request.roomId);
	}

	@Get()
	@ApiOperation({ summary: '[GetAllGame]', description: 'get all game' })
	@ApiResponse({ type: GameResponse, isArray: true })
	@HttpCode(HttpStatus.OK)
	async findAllGames(): Promise<GameResponse[]> {
		return this.gamesService.findAllGames();
	}

	@Get(':id')
	@ApiOperation({ summary: '[GetGame]', description: 'get game' })
	@ApiResponse({ type: GameResponse })
	@HttpCode(HttpStatus.OK)
	async findGameById(@Param('id') id: string): Promise<GameResponse> {
		return this.gamesService.findGameById(id);
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteGame]', description: 'delete game' })
	@HttpCode(HttpStatus.OK)
	async removeGame(@Param('id') id: string): Promise<void> {
		await this.gamesService.removeGame(id);
	}
}
