import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Account } from '../../accounts/entities/account.entity';

@Entity('recurring_transactions')
export class RecurringTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column()
  type: string; // 'income' or 'expense'

  @Column()
  category: string; // 'salary', 'food', 'rent', etc.

  @Column({ default: 'monthly' })
  frequency: string; // 'daily', 'weekly', 'monthly', 'yearly', 'custom'

  @Column({ type: 'int', nullable: true })
  customDays: number;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  lastProcessed: Date;

  @Column({ nullable: true })
  nextProcessingDate: Date;

  @Column({ default: 'active' })
  status: string; // 'active', 'paused', 'cancelled', 'completed'

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.recurringTransactions)
  user: User;

  @ManyToOne(() => Account, account => account.transactions)
  account: Account;

  // Helper methods
  isActive(): boolean {
    return this.status === 'active';
  }

  isIncome(): boolean {
    return this.type === 'income';
  }

  isExpense(): boolean {
    return this.type === 'expense';
  }

  shouldProcessToday(): boolean {
    if (!this.isActive() || !this.nextProcessingDate) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextDate = new Date(this.nextProcessingDate);
    nextDate.setHours(0, 0, 0, 0);
    
    return nextDate <= today;
  }

  calculateNextDate(): Date {
    const nextDate = new Date(this.nextProcessingDate || this.startDate);
    
    switch (this.frequency) {
      case 'daily':
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case 'weekly':
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case 'yearly':
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
      case 'custom':
        nextDate.setDate(nextDate.getDate() + (this.customDays || 30));
        break;
    }
    
    return nextDate;
  }
}