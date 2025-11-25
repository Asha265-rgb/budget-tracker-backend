import { Expose } from 'class-transformer';

export class BudgetResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  amount: number;

  @Expose()
  spent: number;

  @Expose()
  period: string;

  @Expose()
  category: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  rolloverEnabled: boolean;

  @Expose()
  rolloverAmount: number;

  @Expose()
  status: string;

  @Expose()
  color: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  get remaining(): number {
    return this.amount - this.spent;
  }

  @Expose()
  get progressPercentage(): number {
    return this.amount === 0 ? 0 : (this.spent / this.amount) * 100;
  }

  @Expose()
  get isOverspent(): boolean {
    return this.spent > this.amount;
  }
}
