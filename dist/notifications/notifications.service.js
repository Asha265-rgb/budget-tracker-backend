"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./entities/notification.entity");
let NotificationsService = class NotificationsService {
    constructor(notificationsRepository) {
        this.notificationsRepository = notificationsRepository;
    }
    async update(id, updateNotificationDto) {
        const notification = await this.findById(id);
        Object.assign(notification, updateNotificationDto);
        return await this.notificationsRepository.save(notification);
    }
    async delete(id) {
        const result = await this.notificationsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Notification not found');
        }
        return { message: 'Notification deleted successfully' };
    }
    async create(userId, notificationData) {
        const notification = this.notificationsRepository.create({
            ...notificationData,
            user: { id: userId }
        });
        return await this.notificationsRepository.save(notification);
    }
    async findByUser(userId, unreadOnly = false) {
        const where = { user: { id: userId } };
        if (unreadOnly) {
            where.status = 'unread';
        }
        return await this.notificationsRepository.find({
            where,
            order: { createdAt: 'DESC' }
        });
    }
    async findById(id) {
        const notification = await this.notificationsRepository.findOne({
            where: { id },
            relations: ['user']
        });
        if (!notification) {
            throw new common_1.NotFoundException('Notification not found');
        }
        return notification;
    }
    async markAsRead(id) {
        const notification = await this.findById(id);
        notification.markAsRead();
        return await this.notificationsRepository.save(notification);
    }
    async markAllAsRead(userId) {
        await this.notificationsRepository.update({ user: { id: userId }, status: 'unread' }, { status: 'read' });
    }
    async getUnreadCount(userId) {
        return await this.notificationsRepository.count({
            where: { user: { id: userId }, status: 'unread' }
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map