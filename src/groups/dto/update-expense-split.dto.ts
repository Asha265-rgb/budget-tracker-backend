import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseSplitDto } from './create-expense-split.dto';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateExpenseSplitDto extends PartialType(CreateExpenseSplitDto) {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  settledAt?: Date;
}
