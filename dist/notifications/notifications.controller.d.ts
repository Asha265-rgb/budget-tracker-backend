import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(userId: string, createNotificationDto: CreateNotificationDto): Promise<import("./entities/notification.entity").Notification>;
    markAllAsRead(userId: string): Promise<void>;
    findByUser(userId: string, unreadOnly?: boolean): Promise<import("./entities/notification.entity").Notification[]>;
    getUnreadCount(userId: string): Promise<number>;
    findOne(id: string): Promise<import("./entities/notification.entity").Notification>;
    markAsRead(id: string): Promise<import("./entities/notification.entity").Notification>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<import("./entities/notification.entity").Notification>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
