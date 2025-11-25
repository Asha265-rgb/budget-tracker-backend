import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { GroupMember } from './group-member.entity';
import { GroupExpense } from './group-expense.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'active' })
  status: string; // 'active', 'frozen', 'archived'

  @Column({ default: 'USD' })
  currency: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.createdGroups)
  createdBy: User;

  @OneToMany(() => GroupMember, groupMember => groupMember.group)
  members: GroupMember[];

  @OneToMany(() => GroupExpense, groupExpense => groupExpense.group)
  expenses: GroupExpense[];

  // Helper methods
  isActive(): boolean {
    return this.status === 'active';
  }

  isFrozen(): boolean {
    return this.status === 'frozen';
  }

  getActiveMembers(): GroupMember[] {
    return this.members?.filter(member => member.status === 'active') || [];
  }

  canAddExpense(): boolean {
    return this.isActive() && this.getActiveMembers().length > 0;
  }

  freezeGroup(): void {
    this.status = 'frozen';
  }

  activateGroup(): void {
    this.status = 'active';
  }
}