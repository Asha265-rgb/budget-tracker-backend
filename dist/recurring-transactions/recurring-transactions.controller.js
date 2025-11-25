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
exports.RecurringTransactionsController = void 0;
const common_1 = require("@nestjs/common");
const recurring_transactions_service_1 = require("./recurring-transactions.service");
const create_recurring_transaction_dto_1 = require("./dto/create-recurring-transaction.dto");
const update_recurring_transaction_dto_1 = require("./dto/update-recurring-transaction.dto");
let RecurringTransactionsController = class RecurringTransactionsController {
    constructor(recurringTransactionsService) {
        this.recurringTransactionsService = recurringTransactionsService;
    }
    create(userId, createRecurringTransactionDto) {
        return this.recurringTransactionsService.create(userId, createRecurringTransactionDto);
    }
    findByUser(userId) {
        return this.recurringTransactionsService.findByUser(userId);
    }
    getUpcoming(userId, days = 30) {
        return this.recurringTransactionsService.getUpcomingTransactions(userId, days);
    }
    findOne(id) {
        return this.recurringTransactionsService.findById(id);
    }
    update(id, updateRecurringTransactionDto) {
        return this.recurringTransactionsService.update(id, updateRecurringTransactionDto);
    }
    remove(id) {
        return this.recurringTransactionsService.delete(id);
    }
};
exports.RecurringTransactionsController = RecurringTransactionsController;
__decorate([
    (0, common_1.Post)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_recurring_transaction_dto_1.CreateRecurringTransactionDto]),
    __metadata("design:returntype", void 0)
], RecurringTransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecurringTransactionsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('upcoming/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], RecurringTransactionsController.prototype, "getUpcoming", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecurringTransactionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_recurring_transaction_dto_1.UpdateRecurringTransactionDto]),
    __metadata("design:returntype", void 0)
], RecurringTransactionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecurringTransactionsController.prototype, "remove", null);
exports.RecurringTransactionsController = RecurringTransactionsController = __decorate([
    (0, common_1.Controller)('recurring-transactions'),
    __metadata("design:paramtypes", [recurring_transactions_service_1.RecurringTransactionsService])
], RecurringTransactionsController);
//# sourceMappingURL=recurring-transactions.controller.js.map