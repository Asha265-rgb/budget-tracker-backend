import { Expose } from 'class-transformer';

export class NotificationResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  message: string;

  @Expose()
  type: string;

  @Expose()
  status: string;

  @Expose()
  metadata: any;

  @Expose()
  relatedEntityId: string;

  @Expose()
  relatedEntityType: string;

  @Expose()
  isActionRequired: boolean;

  @Expose()
  actionUrl: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  get isUnread(): boolean {
    return this.status === 'unread';
  }

  @Expose()
  get isOverspendingAlert(): boolean {
    return this.type === 'overspending';
  }

  @Expose()
  get isBillReminder(): boolean {
    return this.type === 'bill_reminder';
  }

  @Expose()
  get requiresAction(): boolean {
    return this.isActionRequired;
  }
}
