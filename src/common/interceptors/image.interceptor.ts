import { FileInterceptor } from '@nestjs/platform-express';
import { imageFilter } from '../filters/image.filter';

export const ImageInterceptor = (fileName = 'avatar') =>
	FileInterceptor(fileName, {
		limits: {
			fileSize: 5 * 1024 * 1024,
		},
		fileFilter: imageFilter,
	});
