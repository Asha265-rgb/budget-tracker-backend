import { IsString, IsNumber, IsDateString, IsOptional, IsBoolean, Min, IsUUID } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  period: string;

  @IsString()
  category: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsBoolean()
  rolloverEnabled?: boolean;

  @IsOptional()
  @IsString()
  color?: string;

  @IsUUID() // ← ADD THIS LINE
  userId: string; // ← ADD THIS LINE
}
