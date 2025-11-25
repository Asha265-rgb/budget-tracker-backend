import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupExpenseDto } from './create-group-expense.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGroupExpenseDto extends PartialType(CreateGroupExpenseDto) {
  @IsOptional()
  @IsString()
  status?: string;
}
