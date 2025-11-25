import { User } from '../../users/entities/user.entity';
export declare class Notification {
    id: string;
    title: string;
    message: string;
    type: string;
    status: string;
    metadata: any;
    relatedEntityId: string;
    relatedEntityType: string;
    isActionRequired: boolean;
    actionUrl: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    isUnread(): boolean;
    isOverspendingAlert(): boolean;
    isBillReminder(): boolean;
    isGoalMilestone(): boolean;
    markAsRead(): void;
    requiresAction(): boolean;
}
