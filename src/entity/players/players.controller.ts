import { Controller, Get, Param, HttpCode, HttpStatus, Delete, Body, Patch } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerResponse, UpdatePlayerRequest } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi } from 'src/logger';

@Controller('players')
@ApiTags('players')
@ApiBearerAuth()
@LoggerApi()
export class PlayersController {
	constructor(private readonly playersService: PlayersService) {}

	@Get()
	@ApiOperation({ summary: '[GetAllPlayers]', description: 'get all players' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: PlayerResponse, isArray: true })
	async findAllPlayers(): Promise<PlayerResponse[]> {
		return this.playersService.findAllPlayers();
	}

	@Get(':id')
	@ApiOperation({ summary: '[GetPlayer]', description: 'get player' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: PlayerResponse })
	async findPlayerById(@Param('id') id: string): Promise<PlayerResponse> {
		return this.playersService.findPlayerById(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: '[UpdatePlayer]', description: 'update player' })
	@ApiResponse({ type: PlayerResponse })
	@HttpCode(HttpStatus.OK)
	async updatePlayer(@Body() request: UpdatePlayerRequest, @Param('id') id: string): Promise<PlayerResponse> {
		return this.playersService.updatePlayer(id, request);
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeletePlayer]', description: 'delete player' })
	@HttpCode(HttpStatus.OK)
	async removePlayer(@Param('id') id: string): Promise<void> {
		await this.playersService.removePlayer(id);
	}
}
