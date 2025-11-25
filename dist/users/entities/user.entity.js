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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const account_entity_1 = require("../../accounts/entities/account.entity");
const transaction_entity_1 = require("../../transactions/entities/transaction.entity");
const budget_entity_1 = require("../../budgets/entities/budget.entity");
const recurring_transaction_entity_1 = require("../../recurring-transactions/entities/recurring-transaction.entity");
const goal_entity_1 = require("../../goals/entities/goal.entity");
const report_entity_1 = require("../../reports/entities/report.entity");
const notification_entity_1 = require("../../notifications/entities/notification.entity");
const group_entity_1 = require("../../groups/entities/group.entity");
const group_member_entity_1 = require("../../groups/entities/group-member.entity");
const group_expense_entity_1 = require("../../groups/entities/group-expense.entity");
let User = class User {
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 12);
        }
    }
    async validatePassword(password) {
        return bcrypt.compare(password, this.password);
    }
    isAdmin() {
        return this.userType === 'admin';
    }
    isBusiness() {
        return this.userType === 'business';
    }
    isPersonal() {
        return this.userType === 'personal';
    }
    isGroup() {
        return this.userType === 'group';
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'personal' }),
    __metadata("design:type", String)
], User.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'USD' }),
    __metadata("design:type", String)
], User.prototype, "preferredCurrency", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_entity_1.Account, account => account.user),
    __metadata("design:type", Array)
], User.prototype, "accounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.Transaction, transaction => transaction.user),
    __metadata("design:type", Array)
], User.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => budget_entity_1.Budget, budget => budget.user),
    __metadata("design:type", Array)
], User.prototype, "budgets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recurring_transaction_entity_1.RecurringTransaction, recurringTransaction => recurringTransaction.user),
    __metadata("design:type", Array)
], User.prototype, "recurringTransactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => goal_entity_1.Goal, goal => goal.user),
    __metadata("design:type", Array)
], User.prototype, "goals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_entity_1.Report, report => report.user),
    __metadata("design:type", Array)
], User.prototype, "reports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, notification => notification.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_entity_1.Group, group => group.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdGroups", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_member_entity_1.GroupMember, groupMember => groupMember.user),
    __metadata("design:type", Array)
], User.prototype, "groupMemberships", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_expense_entity_1.GroupExpense, groupExpense => groupExpense.paidBy),
    __metadata("design:type", Array)
], User.prototype, "createdGroupExpenses", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map