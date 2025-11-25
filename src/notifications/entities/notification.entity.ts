import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  type: string; // 'overspending', 'bill_reminder', 'recurring_transaction', 'group_settlement', 'goal_milestone', 'low_balance', 'unrealistic_goal'

  @Column({ default: 'unread' })
  status: string; // 'unread', 'read', 'dismissed'

  @Column('simple-json', { nullable: true })
  metadata: any;

  @Column({ nullable: true })
  relatedEntityId: string;

  @Column({ nullable: true })
  relatedEntityType: string;

  @Column({ default: false })
  isActionRequired: boolean;

  @Column({ nullable: true })
  actionUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.notifications)
  user: User;

  // Helper methods
  isUnread(): boolean {
    return this.status === 'unread';
  }

  isOverspendingAlert(): boolean {
    return this.type === 'overspending';
  }

  isBillReminder(): boolean {
    return this.type === 'bill_reminder';
  }

  isGoalMilestone(): boolean {
    return this.type === 'goal_milestone';
  }

  markAsRead(): void {
    this.status = 'read';
  }

  requiresAction(): boolean {
    return this.isActionRequired;
  }
}