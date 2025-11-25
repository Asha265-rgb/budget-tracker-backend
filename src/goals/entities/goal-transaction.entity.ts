import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Goal } from './goal.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('goal_transactions')
export class GoalTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  notes: string;

  @Column({ default: 'savings' })
  type: string; // 'savings', 'withdrawal'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Goal, goal => goal.transactions)
  goal: Goal;

  @ManyToOne(() => Transaction, transaction => transaction.goal, { nullable: true })
  linkedTransaction: Transaction;

  // Helper methods
  isSavings(): boolean {
    return this.type === 'savings';
  }

  isWithdrawal(): boolean {
    return this.type === 'withdrawal';
  }
}