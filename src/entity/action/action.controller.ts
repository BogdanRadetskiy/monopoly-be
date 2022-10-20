import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ActionsService } from './action.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi } from 'src/logger';
import { ActionDto, ActionResponse, UpdateActionRequest } from './dto';

@Controller('actions')
@ApiTags('actions')
@ApiBearerAuth()
@LoggerApi()
export class ActionsController {
	constructor(private readonly actionsService: ActionsService) {}

	@Post()
	@ApiOperation({ summary: '[CreateAction]', description: 'create action' })
	@ApiResponse({ type: ActionResponse })
	@HttpCode(HttpStatus.CREATED)
	async createAction(@Body() request: ActionDto): Promise<ActionResponse> {
		return this.actionsService.createAction(request);
	}

	@Get()
	@ApiOperation({ summary: '[GetAllActions]', description: 'get all action' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: ActionResponse, isArray: true })
	async findAllActions(): Promise<ActionResponse[]> {
		return this.actionsService.findAllActions();
	}

	@Get(':id')
	@ApiOperation({ summary: '[GetAction]', description: 'get action' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: ActionResponse })
	async findActionById(@Param('id') id: string): Promise<ActionResponse> {
		return this.actionsService.findActionById(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: '[UpdateAction]', description: 'update action' })
	@ApiResponse({ type: ActionResponse })
	@HttpCode(HttpStatus.OK)
	async updateAction(@Body() request: UpdateActionRequest, @Param('id') id: string): Promise<ActionResponse> {
		return this.actionsService.updateAction(id, request);
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteAction]', description: 'delete action' })
	@HttpCode(HttpStatus.OK)
	async removeAction(@Param('id') id: string): Promise<void> {
		await this.actionsService.removeAction(id);
	}
}
