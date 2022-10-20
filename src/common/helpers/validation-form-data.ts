import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { StarDto } from 'src/entity/stars/dto';

export const arrayInMultipartRequestHelper = (array: any): any[] => {
	if (!array) {
		return [];
	}

	if (Array.isArray(array)) {
		return array;
	}

	if (typeof array === 'object') {
		return array;
	}

	if (typeof array === 'string' && array.includes('[')) {
		return JSON.parse(array);
	}

	if (typeof array === 'string' && array.includes('{')) {
		return JSON.parse(`[${array}]`);
	}

	if (typeof array === 'string') {
		return array.split(',');
	}
};

@ValidatorConstraint()
export class ArrayDtoValidation implements ValidatorConstraintInterface {
	async validate(value: StarDto) {
		if ('type' in value && 'price' in value) {
			return true;
		}
		throw new BadRequestException('values must be starDto');
	}
}
