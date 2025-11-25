import { IsString, IsNumber, IsDateString, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateGroupExpenseDto {
  @IsString()
  description: string;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  category: string;

  @IsDateString()
  date: Date;

  @IsString()
  splitType: string;

  @IsUUID()
  groupId: string;

  @IsOptional()
  @IsString()
  receiptUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
