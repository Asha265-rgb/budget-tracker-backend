import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Group } from './group.entity';
import { ExpenseSplit } from './expense-split.entity';

@Entity('group_expenses')
export class GroupExpense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column()
  category: string;

  @Column()
  date: Date;

  @Column({ default: 'equal' })
  splitType: string; // 'equal', 'percentage', 'custom'

  @Column({ nullable: true })
  receiptUrl: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'settled', 'cancelled'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.createdGroupExpenses)
  paidBy: User;

  @ManyToOne(() => Group, group => group.expenses)
  group: Group;

  @OneToMany(() => ExpenseSplit, expenseSplit => expenseSplit.expense)
  splits: ExpenseSplit[];

  // Helper methods
  isSettled(): boolean {
    return this.status === 'settled';
  }

  isPending(): boolean {
    return this.status === 'pending';
  }

  getSettledSplits(): ExpenseSplit[] {
    return this.splits?.filter(split => split.isSettled()) || [];
  }

  getPendingSplits(): ExpenseSplit[] {
    return this.splits?.filter(split => split.isPending()) || [];
  }

  markAsSettled(): void {
    this.status = 'settled';
  }

  canEdit(): boolean {
    return this.isPending();
  }

  getTotalSettled(): number {
    return this.getSettledSplits().reduce((total, split) => total + split.amount, 0);
  }

  isFullySettled(): boolean {
    return this.getPendingSplits().length === 0;
  }
}