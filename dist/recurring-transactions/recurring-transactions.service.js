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
exports.RecurringTransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recurring_transaction_entity_1 = require("./entities/recurring-transaction.entity");
let RecurringTransactionsService = class RecurringTransactionsService {
    constructor(recurringTransactionsRepository) {
        this.recurringTransactionsRepository = recurringTransactionsRepository;
    }
    async create(userId, recurringData) {
        const recurringTransaction = this.recurringTransactionsRepository.create({
            ...recurringData,
            nextProcessingDate: recurringData.startDate,
            user: { id: userId }
        });
        return await this.recurringTransactionsRepository.save(recurringTransaction);
    }
    async findByUser(userId) {
        return await this.recurringTransactionsRepository.find({
            where: { user: { id: userId } },
            relations: ['account'],
            order: { nextProcessingDate: 'ASC' }
        });
    }
    async findById(id) {
        const recurringTransaction = await this.recurringTransactionsRepository.findOne({
            where: { id },
            relations: ['user', 'account']
        });
        if (!recurringTransaction) {
            throw new common_1.NotFoundException('Recurring transaction not found');
        }
        return recurringTransaction;
    }
    async update(id, updateData) {
        await this.recurringTransactionsRepository.update(id, updateData);
        return await this.findById(id);
    }
    async delete(id) {
        const recurringTransaction = await this.findById(id);
        await this.recurringTransactionsRepository.remove(recurringTransaction);
    }
    async getUpcomingTransactions(userId, days = 30) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + days);
        return await this.recurringTransactionsRepository
            .createQueryBuilder('recurring')
            .where('recurring.userId = :userId', { userId })
            .andWhere('recurring.status = :status', { status: 'active' })
            .andWhere('recurring.nextProcessingDate BETWEEN :start AND :end', {
            start: startDate,
            end: endDate
        })
            .orderBy('recurring.nextProcessingDate', 'ASC')
            .getMany();
    }
};
exports.RecurringTransactionsService = RecurringTransactionsService;
exports.RecurringTransactionsService = RecurringTransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recurring_transaction_entity_1.RecurringTransaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RecurringTransactionsService);
//# sourceMappingURL=recurring-transactions.service.js.map