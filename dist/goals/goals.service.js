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
exports.GoalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const goal_entity_1 = require("./entities/goal.entity");
const goal_transaction_entity_1 = require("./entities/goal-transaction.entity");
let GoalsService = class GoalsService {
    constructor(goalsRepository, goalTransactionsRepository) {
        this.goalsRepository = goalsRepository;
        this.goalTransactionsRepository = goalTransactionsRepository;
    }
    async create(userId, goalData) {
        const goal = this.goalsRepository.create({
            ...goalData,
            user: { id: userId }
        });
        return await this.goalsRepository.save(goal);
    }
    async findByUser(userId) {
        return await this.goalsRepository.find({
            where: { user: { id: userId } },
            relations: ['transactions'],
            order: { targetDate: 'ASC' }
        });
    }
    async findById(id) {
        const goal = await this.goalsRepository.findOne({
            where: { id },
            relations: ['user', 'transactions']
        });
        if (!goal) {
            throw new common_1.NotFoundException('Goal not found');
        }
        return goal;
    }
    async update(id, updateData) {
        await this.goalsRepository.update(id, updateData);
        return await this.findById(id);
    }
    async delete(id) {
        const goal = await this.findById(id);
        await this.goalsRepository.remove(goal);
    }
    async addSavings(goalId, amount, notes) {
        const goal = await this.findById(goalId);
        const goalTransaction = this.goalTransactionsRepository.create({
            amount,
            notes,
            type: 'savings',
            date: new Date(),
            goal
        });
        await this.goalTransactionsRepository.save(goalTransaction);
        goal.currentAmount += amount;
        if (goal.currentAmount >= goal.targetAmount) {
            goal.status = 'completed';
        }
        goal.isUnrealistic = this.checkIfUnrealistic(goal);
        return await this.goalsRepository.save(goal);
    }
    async getGoalProgress(userId) {
        const goals = await this.findByUser(userId);
        return goals.map(goal => ({
            id: goal.id,
            name: goal.name,
            targetAmount: goal.targetAmount,
            currentAmount: goal.currentAmount,
            progressPercentage: goal.getProgressPercentage(),
            daysRemaining: goal.getDaysRemaining(),
            monthlySavingsNeeded: goal.getMonthlySavingsNeeded(),
            isCompleted: goal.isCompleted(),
            isOverdue: goal.isOverdue()
        }));
    }
    checkIfUnrealistic(goal) {
        const monthlySavingsNeeded = goal.getMonthlySavingsNeeded();
        return monthlySavingsNeeded > 1000;
    }
    async getGoalTransactions(goalId) {
        return await this.goalTransactionsRepository.find({
            where: { goal: { id: goalId } },
            order: { date: 'DESC' }
        });
    }
};
exports.GoalsService = GoalsService;
exports.GoalsService = GoalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(goal_entity_1.Goal)),
    __param(1, (0, typeorm_1.InjectRepository)(goal_transaction_entity_1.GoalTransaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GoalsService);
//# sourceMappingURL=goals.service.js.map