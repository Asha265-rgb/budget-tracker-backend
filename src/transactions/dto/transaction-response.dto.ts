import { Expose } from 'class-transformer';

export class TransactionResponseDto {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  amount: number;

  @Expose()
  type: string;

  @Expose()
  category: string;

  @Expose()
  date: Date;

  @Expose()
  isRecurring: boolean;

  @Expose()
  recurringId: string;

  @Expose()
  notes: string;

  @Expose()
  tags: string[];

  @Expose()
  receiptUrl: string;

  @Expose()
  isSplit: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  accountId: string;

  @Expose()
  budgetId: string;

  @Expose()
  goalId: string;

  @Expose()
  get signedAmount(): number {
    return this.type === 'income' ? this.amount : -this.amount;
  }
}
