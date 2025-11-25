import { Expose } from 'class-transformer';

export class ExpenseSplitResponseDto {
  @Expose()
  id: string;

  @Expose()
  amount: number;

  @Expose()
  percentage: number;

  @Expose()
  status: string;

  @Expose()
  settledAt: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  memberId: string;

  @Expose()
  expenseId: string;

  @Expose()
  get isSettled(): boolean {
    return this.status === 'settled';
  }

  @Expose()
  get isPending(): boolean {
    return this.status === 'pending';
  }

  @Expose()
  get owedAmount(): number {
    return this.amount;
  }
}
