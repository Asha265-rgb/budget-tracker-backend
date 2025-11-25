export declare class CreateNotificationDto {
    title: string;
    message: string;
    type: string;
    metadata?: any;
    relatedEntityId?: string;
    relatedEntityType?: string;
    isActionRequired?: boolean;
    actionUrl?: string;
}
