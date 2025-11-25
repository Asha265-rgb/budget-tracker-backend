import { IsString, IsEnum, IsNumber, IsOptional, Min, IsBoolean, IsUUID } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsEnum(['cash', 'bank', 'credit_card', 'investment', 'savings', 'other'])
  type: string;

  @IsNumber()
  @Min(0)
  balance: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsUUID() // ← ADD THIS LINE
  userId: string; // ← ADD THIS LINE
}
