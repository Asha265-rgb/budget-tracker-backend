import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Budget } from '../../budgets/entities/budget.entity';
import { Goal } from '../../goals/entities/goal.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column()
  type: string; // 'income' or 'expense'

  @Column()
  category: string; // 'salary', 'food', 'rent', 'transport', etc.

  @Column()
  date: Date;

  @Column({ default: false })
  isRecurring: boolean;

  @Column({ nullable: true })
  recurringId: string;

  @Column({ nullable: true })
  notes: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ nullable: true })
  receiptUrl: string;

  @Column({ default: false })
  isSplit: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.transactions)
  user: User;

  @ManyToOne(() => Account, account => account.transactions)
  account: Account;

  @ManyToOne(() => Budget, budget => budget.transactions, { nullable: true })
  budget: Budget;

  @ManyToOne(() => Goal, goal => goal.transactions, { nullable: true })
  goal: Goal;

  // Helper methods
  isIncome(): boolean {
    return this.type === 'income';
  }

  isExpense(): boolean {
    return this.type === 'expense';
  }

  getSignedAmount(): number {
    return this.isIncome() ? this.amount : -this.amount;
  }
}