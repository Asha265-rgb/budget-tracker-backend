import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetDto } from './create-budget.dto';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {
  @IsOptional()
  @IsNumber()
  @Min(0)
  spent?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rolloverAmount?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
