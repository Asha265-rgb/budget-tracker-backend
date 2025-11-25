import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { GoalTransaction } from './goal-transaction.entity';

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 15, scale: 2 })
  targetAmount: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  currentAmount: number;

  @Column()
  targetDate: Date;

  @Column()
  startDate: Date;

  @Column({ default: 'active' })
  status: string; // 'active', 'completed', 'cancelled'

  @Column({ nullable: true })
  category: string; // 'vacation', 'car', 'house', 'education', etc.

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ default: false })
  isUnrealistic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.goals)
  user: User;

  @OneToMany(() => GoalTransaction, goalTransaction => goalTransaction.goal)
  transactions: GoalTransaction[];

  // Helper methods
  getProgressPercentage(): number {
    if (this.targetAmount === 0) return 0;
    return (this.currentAmount / this.targetAmount) * 100;
  }

  getRemainingAmount(): number {
    return this.targetAmount - this.currentAmount;
  }

  getDaysRemaining(): number {
    const today = new Date();
    const target = new Date(this.targetDate);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getMonthlySavingsNeeded(): number {
    const monthsRemaining = this.getDaysRemaining() / 30;
    if (monthsRemaining <= 0) return this.getRemainingAmount();
    return this.getRemainingAmount() / monthsRemaining;
  }

  isCompleted(): boolean {
    return this.currentAmount >= this.targetAmount;
  }

  isOverdue(): boolean {
    const today = new Date();
    return today > new Date(this.targetDate) && !this.isCompleted();
  }

  addAmount(amount: number): void {
    this.currentAmount += amount;
  }
}