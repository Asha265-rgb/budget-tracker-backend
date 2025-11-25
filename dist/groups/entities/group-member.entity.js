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
exports.GroupMember = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const group_entity_1 = require("./group.entity");
const expense_split_entity_1 = require("./expense-split.entity");
let GroupMember = class GroupMember {
    isOwner() {
        return this.role === 'owner';
    }
    isAdmin() {
        return this.role === 'admin' || this.isOwner();
    }
    isActive() {
        return this.status === 'active';
    }
    isPending() {
        return this.status === 'pending';
    }
    getNetBalance() {
        return this.totalOwes - this.totalOwed;
    }
    owesMoney() {
        return this.getNetBalance() > 0;
    }
    isOwedMoney() {
        return this.getNetBalance() < 0;
    }
    isSettled() {
        return this.getNetBalance() === 0;
    }
};
exports.GroupMember = GroupMember;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GroupMember.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'member' }),
    __metadata("design:type", String)
], GroupMember.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], GroupMember.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], GroupMember.prototype, "totalOwed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], GroupMember.prototype, "totalOwes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], GroupMember.prototype, "joinedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], GroupMember.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.groupMemberships),
    __metadata("design:type", user_entity_1.User)
], GroupMember.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group, group => group.members),
    __metadata("design:type", group_entity_1.Group)
], GroupMember.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => expense_split_entity_1.ExpenseSplit, expenseSplit => expenseSplit.member),
    __metadata("design:type", Array)
], GroupMember.prototype, "expenseSplits", void 0);
exports.GroupMember = GroupMember = __decorate([
    (0, typeorm_1.Entity)('group_members')
], GroupMember);
//# sourceMappingURL=group-member.entity.js.map