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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupExpense = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const group_entity_1 = require("./group.entity");
const expense_split_entity_1 = require("./expense-split.entity");
let GroupExpense = class GroupExpense {
    isSettled() {
        return this.status === 'settled';
    }
    isPending() {
        return this.status === 'pending';
    }
    getSettledSplits() {
        return this.splits?.filter(split => split.isSettled()) || [];
    }
    getPendingSplits() {
        return this.splits?.filter(split => split.isPending()) || [];
    }
    markAsSettled() {
        this.status = 'settled';
    }
    canEdit() {
        return this.isPending();
    }
    getTotalSettled() {
        return this.getSettledSplits().reduce((total, split) => total + split.amount, 0);
    }
    isFullySettled() {
        return this.getPendingSplits().length === 0;
    }
};
exports.GroupExpense = GroupExpense;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GroupExpense.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GroupExpense.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], GroupExpense.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GroupExpense.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], GroupExpense.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'equal' }),
    __metadata("design:type", String)
], GroupExpense.prototype, "splitType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GroupExpense.prototype, "receiptUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GroupExpense.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], GroupExpense.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], GroupExpense.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], GroupExpense.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.createdGroupExpenses),
    __metadata("design:type", user_entity_1.User)
], GroupExpense.prototype, "paidBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group, group => group.expenses),
    __metadata("design:type", group_entity_1.Group)
], GroupExpense.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => expense_split_entity_1.ExpenseSplit, expenseSplit => expenseSplit.expense),
    __metadata("design:type", Array)
], GroupExpense.prototype, "splits", void 0);
exports.GroupExpense = GroupExpense = __decorate([
    (0, typeorm_1.Entity)('group_expenses')
], GroupExpense);
//# sourceMappingURL=group-expense.entity.js.map