import { IsString, IsNumber, IsEnum, IsDateString, IsOptional, IsBoolean, IsArray, IsUUID, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  description: string;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  type: string;

  @IsString()
  category: string;

  @IsDateString()
  date: Date;

  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @IsOptional()
  @IsUUID()
  recurringId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  receiptUrl?: string;

  @IsOptional()
  @IsBoolean()
  isSplit?: boolean;

  @IsUUID()
  accountId: string;

  @IsOptional()
  @IsUUID()
  budgetId?: string;

  @IsOptional()
  @IsUUID()
  goalId?: string;

  @IsUUID() // ← ADD THIS LINE
  userId: string; // ← ADD THIS LINE
}
