import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  spent: number;

  @Column({ default: 'monthly' })
  period: string; // 'monthly', 'yearly', 'weekly', 'custom'

  @Column()
  category: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: true })
  rolloverEnabled: boolean;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  rolloverAmount: number;

  @Column({ default: 'active' })
  status: string; // 'active', 'completed', 'cancelled'

  @Column({ nullable: true })
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.budgets)
  user: User;

  @OneToMany(() => Transaction, transaction => transaction.budget)
  transactions: Transaction[];

  // Helper methods
  getRemaining(): number {
    return this.amount - this.spent;
  }

  getProgressPercentage(): number {
    if (this.amount === 0) return 0;
    return (this.spent / this.amount) * 100;
  }

  isOverspent(): boolean {
    return this.spent > this.amount;
  }

  canRollover(): boolean {
    return this.rolloverEnabled && this.getRemaining() > 0;
  }

  addSpending(amount: number): void {
    this.spent += amount;
  }

  isActive(): boolean {
    return this.status === 'active';
  }

  isMonthly(): boolean {
    return this.period === 'monthly';
  }

  isYearly(): boolean {
    return this.period === 'yearly';
  }
}