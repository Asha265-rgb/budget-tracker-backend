import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('user/:userId') // ← Add userId to route
  create(@Param('userId') userId: string, @Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(userId, createNotificationDto);
  }

  @Post('mark-all-read/user/:userId') // ← Add userId to route
  markAllAsRead(@Param('userId') userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string, @Query('unreadOnly') unreadOnly: boolean = false) {
    return this.notificationsService.findByUser(userId, unreadOnly);
  }

  @Get('unread-count/user/:userId')
  getUnreadCount(@Param('userId') userId: string) {
    return this.notificationsService.getUnreadCount(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findById(id);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.delete(id);
  }
}
