import { Expose } from 'class-transformer';

export class GoalResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  targetAmount: number;

  @Expose()
  currentAmount: number;

  @Expose()
  targetDate: Date;

  @Expose()
  startDate: Date;

  @Expose()
  status: string;

  @Expose()
  category: string;

  @Expose()
  color: string;

  @Expose()
  icon: string;

  @Expose()
  notes: string;

  @Expose()
  isUnrealistic: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  get progressPercentage(): number {
    return this.targetAmount === 0 ? 0 : (this.currentAmount / this.targetAmount) * 100;
  }

  @Expose()
  get remainingAmount(): number {
    return this.targetAmount - this.currentAmount;
  }

  @Expose()
  get daysRemaining(): number {
    const today = new Date();
    const target = new Date(this.targetDate);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
