import { IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateExpenseSplitDto {
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  percentage?: number;

  @IsUUID()
  memberId: string;

  @IsUUID()
  expenseId: string;
}
