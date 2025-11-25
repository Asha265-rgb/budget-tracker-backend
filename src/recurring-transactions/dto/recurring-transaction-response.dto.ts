import { Expose } from 'class-transformer';

export class RecurringTransactionResponseDto {
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
  frequency: string;

  @Expose()
  customDays: number;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  lastProcessed: Date;

  @Expose()
  nextProcessingDate: Date;

  @Expose()
  status: string;

  @Expose()
  notes: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  accountId: string;

  @Expose()
  get isActive(): boolean {
    return this.status === 'active';
  }

  @Expose()
  get isIncome(): boolean {
    return this.type === 'income';
  }

  @Expose()
  get isExpense(): boolean {
    return this.type === 'expense';
  }
}
