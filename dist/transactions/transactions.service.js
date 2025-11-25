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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
const accounts_service_1 = require("../accounts/accounts.service");
let TransactionsService = class TransactionsService {
    constructor(transactionsRepository, accountsService) {
        this.transactionsRepository = transactionsRepository;
        this.accountsService = accountsService;
    }
    async create(userId, transactionData) {
        try {
            if (!transactionData.accountId) {
                throw new Error('Account ID is required');
            }
            await this.accountsService.findById(transactionData.accountId);
            const transaction = new transaction_entity_1.Transaction();
            transaction.description = transactionData.description;
            transaction.amount = transactionData.amount;
            transaction.type = transactionData.type;
            transaction.category = transactionData.category || 'other';
            transaction.date = transactionData.date || new Date();
            transaction.isRecurring = transactionData.isRecurring || false;
            transaction.recurringId = transactionData.recurringId;
            transaction.notes = transactionData.notes;
            transaction.tags = transactionData.tags;
            transaction.receiptUrl = transactionData.receiptUrl;
            transaction.isSplit = transactionData.isSplit || false;
            transaction.user = { id: userId };
            transaction.account = { id: transactionData.accountId };
            transaction.budget = transactionData.budgetId ? { id: transactionData.budgetId } : null;
            transaction.goal = transactionData.goalId ? { id: transactionData.goalId } : null;
            const savedTransaction = await this.transactionsRepository.save(transaction);
            const amount = transactionData.type === 'income' ? transactionData.amount : -transactionData.amount;
            await this.accountsService.updateBalance(transactionData.accountId, amount);
            return savedTransaction;
        }
        catch (error) {
            console.error('Error creating transaction:', error);
            throw error;
        }
    }
    async findByUser(userId, filters) {
        const where = { user: { id: userId } };
        if (filters?.startDate && filters?.endDate) {
            where.date = (0, typeorm_2.Between)(filters.startDate, filters.endDate);
        }
        if (filters?.type) {
            where.type = filters.type;
        }
        if (filters?.category) {
            where.category = filters.category;
        }
        return await this.transactionsRepository.find({
            where,
            relations: ['account', 'budget', 'goal'],
            order: { date: 'DESC', createdAt: 'DESC' }
        });
    }
    async findById(id) {
        const transaction = await this.transactionsRepository.findOne({
            where: { id },
            relations: ['account', 'user', 'budget', 'goal']
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        return transaction;
    }
    async update(id, updateData) {
        const transaction = await this.findById(id);
        if (updateData.amount && updateData.amount !== transaction.amount) {
            const oldAmount = transaction.type === 'income' ? transaction.amount : -transaction.amount;
            const newAmount = (updateData.type || transaction.type) === 'income' ? updateData.amount : -updateData.amount;
            const difference = newAmount - oldAmount;
            await this.accountsService.updateBalance(transaction.account.id, difference);
        }
        await this.transactionsRepository.update(id, updateData);
        return await this.findById(id);
    }
    async delete(id) {
        const transaction = await this.findById(id);
        const amount = transaction.type === 'income' ? -transaction.amount : transaction.amount;
        await this.accountsService.updateBalance(transaction.account.id, amount);
        await this.transactionsRepository.remove(transaction);
    }
    async getTransactionSummary(userId, startDate, endDate) {
        const transactions = await this.findByUser(userId, { startDate, endDate });
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        return {
            income,
            expenses,
            net: income - expenses,
            transactionCount: transactions.length
        };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        accounts_service_1.AccountsService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map