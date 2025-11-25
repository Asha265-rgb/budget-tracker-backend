import { Expose } from 'class-transformer';

export class GroupExpenseResponseDto {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  amount: number;

  @Expose()
  category: string;

  @Expose()
  date: Date;

  @Expose()
  splitType: string;

  @Expose()
  receiptUrl: string;

  @Expose()
  notes: string;

  @Expose()
  status: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  paidById: string;

  @Expose()
  groupId: string;

  @Expose()
  get isSettled(): boolean {
    return this.status === 'settled';
  }

  @Expose()
  get isPending(): boolean {
    return this.status === 'pending';
  }

  @Expose()
  get canEdit(): boolean {
    return this.isPending;
  }
}
