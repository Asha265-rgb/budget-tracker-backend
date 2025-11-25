import { PartialType } from '@nestjs/mapped-types';
import { CreateRecurringTransactionDto } from './create-recurring-transaction.dto';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateRecurringTransactionDto extends PartialType(CreateRecurringTransactionDto) {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  lastProcessed?: Date;

  @IsOptional()
  @IsDateString()
  nextProcessingDate?: Date;
}
