import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Group } from './group.entity';
import { ExpenseSplit } from './expense-split.entity'; // ← Add this import

@Entity('group_members')
export class GroupMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'member' })
  role: string; // 'owner', 'admin', 'member'

  @Column({ default: 'pending' })
  status: string; // 'pending', 'active', 'inactive'

  @Column({ default: 0 })
  totalOwed: number;

  @Column({ default: 0 })
  totalOwes: number;

  @CreateDateColumn()
  joinedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.groupMemberships)
  user: User;

  @ManyToOne(() => Group, group => group.members)
  group: Group;

  // ADD THIS RELATIONSHIP:
  @OneToMany(() => ExpenseSplit, expenseSplit => expenseSplit.member)
  expenseSplits: ExpenseSplit[];

  // Helper methods
  isOwner(): boolean {
    return this.role === 'owner';
  }

  isAdmin(): boolean {
    return this.role === 'admin' || this.isOwner();
  }

  isActive(): boolean {
    return this.status === 'active';
  }

  isPending(): boolean {
    return this.status === 'pending';
  }

  getNetBalance(): number {
    return this.totalOwes - this.totalOwed;
  }

  owesMoney(): boolean {
    return this.getNetBalance() > 0;
  }

  isOwedMoney(): boolean {
    return this.getNetBalance() < 0;
  }

  isSettled(): boolean {
    return this.getNetBalance() === 0;
  }
}