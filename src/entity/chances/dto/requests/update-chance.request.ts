import { PartialType } from '@nestjs/mapped-types';
import { ChanceDto } from '../chance.dto';

export class UpdateChanceRequest extends PartialType(ChanceDto) {}
