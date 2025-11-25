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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const group_entity_1 = require("./entities/group.entity");
const group_member_entity_1 = require("./entities/group-member.entity");
const group_expense_entity_1 = require("./entities/group-expense.entity");
const expense_split_entity_1 = require("./entities/expense-split.entity");
const users_service_1 = require("../users/users.service");
let GroupsService = class GroupsService {
    constructor(groupsRepository, groupMembersRepository, groupExpensesRepository, expenseSplitsRepository, usersService) {
        this.groupsRepository = groupsRepository;
        this.groupMembersRepository = groupMembersRepository;
        this.groupExpensesRepository = groupExpensesRepository;
        this.expenseSplitsRepository = expenseSplitsRepository;
        this.usersService = usersService;
    }
    async findAll() {
        return this.groupsRepository.find({
            relations: ['createdBy', 'members', 'members.user']
        });
    }
    async update(id, updateGroupDto) {
        const group = await this.groupsRepository.findOne({ where: { id } });
        if (!group) {
            throw new common_1.NotFoundException('Group not found');
        }
        Object.assign(group, updateGroupDto);
        return this.groupsRepository.save(group);
    }
    async delete(id) {
        const result = await this.groupsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Group not found');
        }
        return { message: 'Group deleted successfully' };
    }
    async create(userId, groupData) {
        const group = this.groupsRepository.create({
            ...groupData,
            createdBy: { id: userId }
        });
        const savedGroup = await this.groupsRepository.save(group);
        await this.addMember(savedGroup.id, userId, 'owner');
        return savedGroup;
    }
    async findById(id) {
        const group = await this.groupsRepository.findOne({
            where: { id },
            relations: ['createdBy', 'members', 'members.user', 'expenses']
        });
        if (!group) {
            throw new common_1.NotFoundException('Group not found');
        }
        return group;
    }
    async findByUser(userId) {
        const memberships = await this.groupMembersRepository.find({
            where: { user: { id: userId }, status: 'active' },
            relations: ['group', 'group.createdBy']
        });
        return memberships.map(membership => membership.group);
    }
    async addMember(groupId, userId, role = 'member') {
        const group = await this.findById(groupId);
        const existingMember = await this.groupMembersRepository.findOne({
            where: { group: { id: groupId }, user: { id: userId } }
        });
        if (existingMember) {
            throw new common_1.ConflictException('User is already a member of this group');
        }
        const member = this.groupMembersRepository.create({
            role,
            status: 'pending',
            user: { id: userId },
            group: { id: groupId }
        });
        return await this.groupMembersRepository.save(member);
    }
    async acceptInvite(groupId, userId) {
        const member = await this.groupMembersRepository.findOne({
            where: { group: { id: groupId }, user: { id: userId }, status: 'pending' }
        });
        if (!member) {
            throw new common_1.NotFoundException('Invitation not found');
        }
        member.status = 'active';
        member.joinedAt = new Date();
        return await this.groupMembersRepository.save(member);
    }
    async createExpense(groupId, userId, expenseData) {
        const group = await this.findById(groupId);
        const member = await this.getGroupMember(groupId, userId);
        if (!member.isActive()) {
            throw new common_1.ConflictException('Only active members can create expenses');
        }
        if (!expenseData.amount || !expenseData.description) {
            throw new common_1.BadRequestException('Amount and description are required');
        }
        const expense = this.groupExpensesRepository.create({
            ...expenseData,
            splitType: expenseData.splitType || 'equal',
            paidBy: { id: userId },
            group: { id: groupId }
        });
        const savedExpense = await this.groupExpensesRepository.save(expense);
        await this.createExpenseSplits(savedExpense.id, expense.splitType, expenseData.amount);
        return savedExpense;
    }
    async createExpenseSplits(expenseId, splitType, totalAmount) {
        const expense = await this.groupExpensesRepository.findOne({
            where: { id: expenseId },
            relations: ['group', 'group.members', 'group.members.user']
        });
        if (!expense) {
            throw new common_1.NotFoundException('Expense not found');
        }
        const activeMembers = expense.group.members.filter(member => member.isActive());
        if (splitType === 'equal') {
            const splitAmount = totalAmount / activeMembers.length;
            for (const member of activeMembers) {
                const split = this.expenseSplitsRepository.create({
                    amount: splitAmount,
                    expense: { id: expenseId },
                    member: { id: member.id }
                });
                await this.expenseSplitsRepository.save(split);
            }
        }
    }
    async settleExpense(expenseId, splitId, userId) {
        const split = await this.expenseSplitsRepository.findOne({
            where: { id: splitId },
            relations: ['member', 'member.user', 'expense']
        });
        if (!split) {
            throw new common_1.NotFoundException('Expense split not found');
        }
        if (!split.belongsToUser(userId)) {
            throw new common_1.ConflictException('You can only settle your own splits');
        }
        split.markAsSettled();
        return await this.expenseSplitsRepository.save(split);
    }
    async getGroupBalance(groupId) {
        const group = await this.findById(groupId);
        const balances = [];
        for (const member of group.members) {
            if (member.isActive()) {
                balances.push({
                    userId: member.user.id,
                    userName: `${member.user.firstName} ${member.user.lastName}`,
                    totalOwed: member.totalOwed,
                    totalOwes: member.totalOwes,
                    netBalance: member.getNetBalance()
                });
            }
        }
        return balances;
    }
    async getGroupMember(groupId, userId) {
        const member = await this.groupMembersRepository.findOne({
            where: { group: { id: groupId }, user: { id: userId } },
            relations: ['user']
        });
        if (!member) {
            throw new common_1.NotFoundException('User is not a member of this group');
        }
        return member;
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __param(1, (0, typeorm_1.InjectRepository)(group_member_entity_1.GroupMember)),
    __param(2, (0, typeorm_1.InjectRepository)(group_expense_entity_1.GroupExpense)),
    __param(3, (0, typeorm_1.InjectRepository)(expense_split_entity_1.ExpenseSplit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map