import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsService {
    private notificationsRepository;
    constructor(notificationsRepository: Repository<Notification>);
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification>;
    delete(id: string): Promise<{
        message: string;
    }>;
    create(userId: string, notificationData: Partial<Notification>): Promise<Notification>;
    findByUser(userId: string, unreadOnly?: boolean): Promise<Notification[]>;
    findById(id: string): Promise<Notification>;
    markAsRead(id: string): Promise<Notification>;
    markAllAsRead(userId: string): Promise<void>;
    getUnreadCount(userId: string): Promise<number>;
}
