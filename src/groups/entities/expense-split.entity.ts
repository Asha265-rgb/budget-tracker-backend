import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { GroupMember } from './group-member.entity';
import { GroupExpense } from './group-expense.entity';

@Entity('expense_splits')
export class ExpenseSplit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  percentage: number;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'settled'

  @Column({ nullable: true })
  settledAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships - FIXED: Use the correct property name
  @ManyToOne(() => GroupMember, groupMember => groupMember.expenseSplits)
  member: GroupMember;

  @ManyToOne(() => GroupExpense, expense => expense.splits)
  expense: GroupExpense;

  // Helper methods
  isSettled(): boolean {
    return this.status === 'settled';
  }

  isPending(): boolean {
    return this.status === 'pending';
  }

  markAsSettled(): void {
    this.status = 'settled';
    this.settledAt = new Date();
  }

  getOwedAmount(): number {
    return this.amount;
  }

  belongsToUser(userId: string): boolean {
    return this.member.user.id === userId;
  }
}