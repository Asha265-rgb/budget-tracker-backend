import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'bank' })
  type: string; // 'cash', 'bank', 'credit_card', 'investment', 'savings', 'other'

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  balance: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ nullable: true })
  accountNumber: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ default: 'active' })
  status: string; // 'active', 'inactive', 'archived'

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.accounts)
  user: User;

  @OneToMany(() => Transaction, transaction => transaction.account)
  transactions: Transaction[];

  // Helper methods
  updateBalance(amount: number): void {
    this.balance += amount;
  }

  canDelete(): boolean {
    return this.balance === 0 && !this.isDeleted;
  }

  isActive(): boolean {
    return this.status === 'active';
  }

  isBankAccount(): boolean {
    return this.type === 'bank';
  }

  isCreditCard(): boolean {
    return this.type === 'credit_card';
  }

  isCash(): boolean {
    return this.type === 'cash';
  }
}