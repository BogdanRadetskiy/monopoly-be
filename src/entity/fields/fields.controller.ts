import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	HttpStatus,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldRequest, FieldResponse, UpdateFieldRequest } from './dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi } from 'src/logger';
import { ImageInterceptor, ImageDataType } from 'src/common';
@Controller('fields')
@ApiTags('fields')
@ApiBearerAuth()
@LoggerApi()
export class FieldsController {
	constructor(private readonly fieldsService: FieldsService) {}

	@Post()
	@ApiOperation({ summary: '[CreateField]', description: 'create field' })
	@ApiResponse({ type: FieldResponse })
	@UseInterceptors(ImageInterceptor())
	@ApiConsumes('multipart/form-data')
	@HttpCode(HttpStatus.CREATED)
	async createField(
		@Body() request: CreateFieldRequest,
		@UploadedFile() file: ImageDataType
	): Promise<FieldResponse> {
		return this.fieldsService.createField(request, file);
	}

	@Get(':id')
	@ApiOperation({ summary: '[GetField]', description: 'get field' })
	@ApiResponse({ type: FieldResponse })
	@HttpCode(HttpStatus.OK)
	async findFieldById(@Param('id') id: string): Promise<FieldResponse> {
		return this.fieldsService.findFieldById(id).then(field => FieldResponse.mapFrom(field));
	}

	@Get()
	@ApiOperation({ summary: '[GetAllField]', description: 'get all field' })
	@ApiResponse({ type: FieldResponse, isArray: true })
	@HttpCode(HttpStatus.OK)
	async findAllFields(): Promise<FieldResponse[]> {
		return this.fieldsService.findAllFields();
	}

	@Patch(':id')
	@ApiOperation({ summary: '[UpdateField]', description: 'update field' })
	@ApiResponse({ type: FieldResponse })
	@HttpCode(HttpStatus.OK)
	async updateField(@Body() request: UpdateFieldRequest, @Param('id') id: string): Promise<FieldResponse> {
		return this.fieldsService.updateField(id, request);
	}

	@Delete(':id')
	@ApiOperation({ summary: '[DeleteField]', description: 'delete field' })
	@HttpCode(HttpStatus.OK)
	async removeField(@Param('id') id: string): Promise<void> {
		await this.fieldsService.removeField(id);
	}
}
