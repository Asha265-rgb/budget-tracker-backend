import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecurringTransaction } from './entities/recurring-transaction.entity';

@Injectable()
export class RecurringTransactionsService {
  constructor(
    @InjectRepository(RecurringTransaction)
    private recurringTransactionsRepository: Repository<RecurringTransaction>,
  ) {}

  async create(userId: string, recurringData: Partial<RecurringTransaction>): Promise<RecurringTransaction> {
    const recurringTransaction = this.recurringTransactionsRepository.create({
      ...recurringData,
      nextProcessingDate: recurringData.startDate,
      user: { id: userId }
    });
    return await this.recurringTransactionsRepository.save(recurringTransaction);
  }

  async findByUser(userId: string): Promise<RecurringTransaction[]> {
    return await this.recurringTransactionsRepository.find({
      where: { user: { id: userId } },
      relations: ['account'],
      order: { nextProcessingDate: 'ASC' }
    });
  }

  async findById(id: string): Promise<RecurringTransaction> {
    const recurringTransaction = await this.recurringTransactionsRepository.findOne({
      where: { id },
      relations: ['user', 'account']
    });
    if (!recurringTransaction) {
      throw new NotFoundException('Recurring transaction not found');
    }
    return recurringTransaction;
  }

  async update(id: string, updateData: Partial<RecurringTransaction>): Promise<RecurringTransaction> {
    await this.recurringTransactionsRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const recurringTransaction = await this.findById(id);
    await this.recurringTransactionsRepository.remove(recurringTransaction);
  }

  async getUpcomingTransactions(userId: string, days: number = 30): Promise<RecurringTransaction[]> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    return await this.recurringTransactionsRepository
      .createQueryBuilder('recurring')
      .where('recurring.userId = :userId', { userId })
      .andWhere('recurring.status = :status', { status: 'active' })
      .andWhere('recurring.nextProcessingDate BETWEEN :start AND :end', {
        start: startDate,
        end: endDate
      })
      .orderBy('recurring.nextProcessingDate', 'ASC')
      .getMany();
  }
}
