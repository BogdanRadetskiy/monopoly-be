import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SettingsService } from './setting.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi } from 'src/logger';
import { CreateSettingRequest, SettingResponse, UpdateSettingRequest } from './dto';

@Controller('settings')
@ApiTags('settings')
@ApiBearerAuth()
@LoggerApi()
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {}

	@Post()
	@ApiOperation({ summary: '[CreateSetting]', description: 'create setting' })
	@ApiResponse({ type: SettingResponse })
	@HttpCode(HttpStatus.CREATED)
	async createSetting(@Body() request: CreateSettingRequest): Promise<SettingResponse> {
		return this.settingsService.createSetting(request);
	}

	@Get()
	@ApiOperation({ summary: '[GetAllSettings]', description: 'get all setting' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: SettingResponse, isArray: true })
	async findAllSettings(): Promise<SettingResponse[]> {
		return this.settingsService.findAllSettings();
	}

	@Get(':id')
	@ApiOperation({ summary: '[GetSetting]', description: 'get setting' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: SettingResponse })
	async findSettingById(@Param('id') id: string): Promise<SettingResponse> {
		return this.settingsService.findSettingById(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: '[UpdateSetting]', description: 'update setting' })
	@ApiResponse({ type: SettingResponse })
	@HttpCode(HttpStatus.OK)
	async updateSetting(@Body() request: UpdateSettingRequest, @Param('id') id: string): Promise<SettingResponse> {
		return this.settingsService.updateSetting(id, request);
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteSetting]', description: 'delete setting' })
	@HttpCode(HttpStatus.OK)
	async removeSetting(@Param('id') id: string): Promise<void> {
		await this.settingsService.removeSetting(id);
	}
}
