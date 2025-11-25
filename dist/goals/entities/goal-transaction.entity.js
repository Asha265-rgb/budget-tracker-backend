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
exports.GoalTransaction = void 0;
const typeorm_1 = require("typeorm");
const goal_entity_1 = require("./goal.entity");
const transaction_entity_1 = require("../../transactions/entities/transaction.entity");
let GoalTransaction = class GoalTransaction {
    isSavings() {
        return this.type === 'savings';
    }
    isWithdrawal() {
        return this.type === 'withdrawal';
    }
};
exports.GoalTransaction = GoalTransaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GoalTransaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], GoalTransaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], GoalTransaction.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GoalTransaction.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'savings' }),
    __metadata("design:type", String)
], GoalTransaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], GoalTransaction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], GoalTransaction.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => goal_entity_1.Goal, goal => goal.transactions),
    __metadata("design:type", goal_entity_1.Goal)
], GoalTransaction.prototype, "goal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => transaction_entity_1.Transaction, transaction => transaction.goal, { nullable: true }),
    __metadata("design:type", transaction_entity_1.Transaction)
], GoalTransaction.prototype, "linkedTransaction", void 0);
exports.GoalTransaction = GoalTransaction = __decorate([
    (0, typeorm_1.Entity)('goal_transactions')
], GoalTransaction);
//# sourceMappingURL=goal-transaction.entity.js.map