import { IsString, IsNumber, IsDateString, IsOptional, IsBoolean, Min, IsUUID } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0.01)
  targetAmount: number;

  @IsDateString()
  targetDate: Date;

  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsUUID() // ← ADD THIS LINE
  userId: string; // ← ADD THIS LINE
}
