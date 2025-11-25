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
exports.ExpenseSplit = void 0;
const typeorm_1 = require("typeorm");
const group_member_entity_1 = require("./group-member.entity");
const group_expense_entity_1 = require("./group-expense.entity");
let ExpenseSplit = class ExpenseSplit {
    isSettled() {
        return this.status === 'settled';
    }
    isPending() {
        return this.status === 'pending';
    }
    markAsSettled() {
        this.status = 'settled';
        this.settledAt = new Date();
    }
    getOwedAmount() {
        return this.amount;
    }
    belongsToUser(userId) {
        return this.member.user.id === userId;
    }
};
exports.ExpenseSplit = ExpenseSplit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExpenseSplit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ExpenseSplit.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ExpenseSplit.prototype, "percentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], ExpenseSplit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ExpenseSplit.prototype, "settledAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ExpenseSplit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ExpenseSplit.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_member_entity_1.GroupMember, groupMember => groupMember.expenseSplits),
    __metadata("design:type", group_member_entity_1.GroupMember)
], ExpenseSplit.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_expense_entity_1.GroupExpense, expense => expense.splits),
    __metadata("design:type", group_expense_entity_1.GroupExpense)
], ExpenseSplit.prototype, "expense", void 0);
exports.ExpenseSplit = ExpenseSplit = __decorate([
    (0, typeorm_1.Entity)('expense_splits')
], ExpenseSplit);
//# sourceMappingURL=expense-split.entity.js.map