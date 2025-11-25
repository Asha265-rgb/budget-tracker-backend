import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private budgetsRepository: Repository<Budget>,
  ) {}

  async create(userId: string, budgetData: Partial<Budget>): Promise<Budget> {
    const budget = this.budgetsRepository.create({
      ...budgetData,
      user: { id: userId }
    });
    return await this.budgetsRepository.save(budget);
  }

  async findByUser(userId: string): Promise<Budget[]> {
    return await this.budgetsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    });
  }

  async findById(id: string): Promise<Budget> {
    const budget = await this.budgetsRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    return budget;
  }

  async update(id: string, updateData: Partial<Budget>): Promise<Budget> {
    await this.budgetsRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const budget = await this.findById(id);
    await this.budgetsRepository.remove(budget);
  }
}
