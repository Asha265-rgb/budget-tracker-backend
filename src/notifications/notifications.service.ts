import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  // ADD THESE MISSING METHODS:

  async update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const notification = await this.findById(id);
    Object.assign(notification, updateNotificationDto);
    return await this.notificationsRepository.save(notification);
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.notificationsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Notification not found');
    }
    return { message: 'Notification deleted successfully' };
  }

  // YOUR EXISTING METHODS:

  async create(userId: string, notificationData: Partial<Notification>): Promise<Notification> {
    const notification = this.notificationsRepository.create({
      ...notificationData,
      user: { id: userId }
    });
    return await this.notificationsRepository.save(notification);
  }

  async findByUser(userId: string, unreadOnly: boolean = false): Promise<Notification[]> {
    const where: any = { user: { id: userId } };
    if (unreadOnly) {
      where.status = 'unread';
    }

    return await this.notificationsRepository.find({
      where,
      order: { createdAt: 'DESC' }
    });
  }

  async findById(id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await this.findById(id);
    notification.markAsRead();
    return await this.notificationsRepository.save(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationsRepository.update(
      { user: { id: userId }, status: 'unread' },
      { status: 'read' }
    );
  }

  async getUnreadCount(userId: string): Promise<number> {
    return await this.notificationsRepository.count({
      where: { user: { id: userId }, status: 'unread' }
    });
  }
}
