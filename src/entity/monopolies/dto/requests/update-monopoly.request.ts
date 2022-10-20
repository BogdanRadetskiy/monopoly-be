import { PartialType } from '@nestjs/mapped-types';
import { MonopolyDto } from '../monopoly.dto';

export class UpdateMonopolyRequest extends PartialType(MonopolyDto) {}
