import { PartialType } from '@nestjs/mapped-types';
import { CreateGoalDto } from './create-goal.dto';
import { IsOptional, IsString, IsNumber, Min, IsBoolean } from 'class-validator';

export class UpdateGoalDto extends PartialType(CreateGoalDto) {
  @IsOptional()
  @IsNumber()
  @Min(0)
  currentAmount?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  isUnrealistic?: boolean;
}
