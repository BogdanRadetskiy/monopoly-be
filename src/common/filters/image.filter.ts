import { BadRequestException } from '@nestjs/common';
import { ImageFormatEnum } from '../enums/images.enum';

export const imageFilter = (req: Request, file, cb) => {
	const mimetype = file.mimetype;
	if (mimetype === ImageFormatEnum[mimetype]) {
		const arrStr = file?.originalname?.split('.');
		file.format = arrStr.pop();
		file.imageName = arrStr.join('.');

		return cb(null, true);
	}

	return cb(new BadRequestException(`Type ${file.mimetype} does not allowed`), false);
};
