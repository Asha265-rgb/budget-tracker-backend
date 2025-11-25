import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';
import { GoalTransaction } from './entities/goal-transaction.entity';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private goalsRepository: Repository<Goal>,
    @InjectRepository(GoalTransaction)
    private goalTransactionsRepository: Repository<GoalTransaction>,
  ) {}

  async create(userId: string, goalData: Partial<Goal>): Promise<Goal> {
    const goal = this.goalsRepository.create({
      ...goalData,
      user: { id: userId }
    });
    return await this.goalsRepository.save(goal);
  }

  async findByUser(userId: string): Promise<Goal[]> {
    return await this.goalsRepository.find({
      where: { user: { id: userId } },
      relations: ['transactions'],
      order: { targetDate: 'ASC' }
    });
  }

  async findById(id: string): Promise<Goal> {
    const goal = await this.goalsRepository.findOne({
      where: { id },
      relations: ['user', 'transactions']
    });
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }
    return goal;
  }

  async update(id: string, updateData: Partial<Goal>): Promise<Goal> {
    await this.goalsRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const goal = await this.findById(id);
    await this.goalsRepository.remove(goal);
  }

  async addSavings(goalId: string, amount: number, notes?: string): Promise<Goal> {
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
    
    // Check if goal is completed
    if (goal.currentAmount >= goal.targetAmount) {
      goal.status = 'completed';
    }

    // Check if goal is unrealistic
    goal.isUnrealistic = this.checkIfUnrealistic(goal);

    return await this.goalsRepository.save(goal);
  }

  async getGoalProgress(userId: string): Promise<any[]> {
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

  private checkIfUnrealistic(goal: Goal): boolean {
    const monthlySavingsNeeded = goal.getMonthlySavingsNeeded();
    // This is a simplified check - in real app, you'd compare with user's income
    return monthlySavingsNeeded > 1000; // Example threshold
  }

  async getGoalTransactions(goalId: string): Promise<GoalTransaction[]> {
    return await this.goalTransactionsRepository.find({
      where: { goal: { id: goalId } },
      order: { date: 'DESC' }
    });
  }
}
