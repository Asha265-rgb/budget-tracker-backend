import { IsString, IsNumber, IsDateString, IsOptional, Min, IsPositive, IsUUID } from 'class-validator';

export class CreateRecurringTransactionDto {
  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount: number;

  @IsString()
  type: string;

  @IsString()
  category: string;

  @IsString()
  frequency: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  customDays?: number;

  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsUUID()
  accountId: string;
}
