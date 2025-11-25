export declare class NotificationResponseDto {
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
    get isUnread(): boolean;
    get isOverspendingAlert(): boolean;
    get isBillReminder(): boolean;
    get requiresAction(): boolean;
}
