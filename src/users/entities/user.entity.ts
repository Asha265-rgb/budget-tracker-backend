import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Account } from '../../accounts/entities/account.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Budget } from '../../budgets/entities/budget.entity';
import { RecurringTransaction } from '../../recurring-transactions/entities/recurring-transaction.entity';
import { Goal } from '../../goals/entities/goal.entity';
import { Report } from '../../reports/entities/report.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Group } from '../../groups/entities/group.entity';
import { GroupMember } from '../../groups/entities/group-member.entity';
import { GroupExpense } from '../../groups/entities/group-expense.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: 'personal' })
  userType: string; // 'personal', 'business', 'group', 'admin'

  @Column({ default: 'USD' })
  preferredCurrency: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Account, account => account.user)
  accounts: Account[];

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Budget, budget => budget.user)
  budgets: Budget[];

  @OneToMany(() => RecurringTransaction, recurringTransaction => recurringTransaction.user)
  recurringTransactions: RecurringTransaction[];

  @OneToMany(() => Goal, goal => goal.user)
  goals: Goal[];

  @OneToMany(() => Report, report => report.user)
  reports: Report[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  @OneToMany(() => Group, group => group.createdBy)
  createdGroups: Group[];

  @OneToMany(() => GroupMember, groupMember => groupMember.user)
  groupMemberships: GroupMember[];

  @OneToMany(() => GroupExpense, groupExpense => groupExpense.paidBy)
  createdGroupExpenses: GroupExpense[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  isAdmin(): boolean {
    return this.userType === 'admin';
  }

  isBusiness(): boolean {
    return this.userType === 'business';
  }

  isPersonal(): boolean {
    return this.userType === 'personal';
  }

  isGroup(): boolean {
    return this.userType === 'group';
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}