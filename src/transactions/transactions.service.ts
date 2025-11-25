import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private accountsService: AccountsService,
  ) {}

  async create(userId: string, transactionData: any): Promise<Transaction> {
    try {
      // Validate that accountId exists
      if (!transactionData.accountId) {
        throw new Error('Account ID is required');
      }

      // Verify account exists
      await this.accountsService.findById(transactionData.accountId);

      // Create transaction entity
      const transaction = new Transaction();
      transaction.description = transactionData.description;
      transaction.amount = transactionData.amount;
      transaction.type = transactionData.type;
      transaction.category = transactionData.category || 'other';
      transaction.date = transactionData.date || new Date();
      transaction.isRecurring = transactionData.isRecurring || false;
      transaction.recurringId = transactionData.recurringId;
      transaction.notes = transactionData.notes;
      transaction.tags = transactionData.tags;
      transaction.receiptUrl = transactionData.receiptUrl;
      transaction.isSplit = transactionData.isSplit || false;
      transaction.user = { id: userId } as any;
      transaction.account = { id: transactionData.accountId } as any;
      transaction.budget = transactionData.budgetId ? { id: transactionData.budgetId } as any : null;
      transaction.goal = transactionData.goalId ? { id: transactionData.goalId } as any : null;

      const savedTransaction = await this.transactionsRepository.save(transaction);
      
      // Update account balance
      const amount = transactionData.type === 'income' ? transactionData.amount : -transactionData.amount;
      await this.accountsService.updateBalance(transactionData.accountId, amount);

      return savedTransaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  async findByUser(userId: string, filters?: {
    startDate?: Date;
    endDate?: Date;
    type?: string;
    category?: string;
  }): Promise<Transaction[]> {
    const where: any = { user: { id: userId } };

    if (filters?.startDate && filters?.endDate) {
      where.date = Between(filters.startDate, filters.endDate);
    }
    if (filters?.type) {
      where.type = filters.type;
    }
    if (filters?.category) {
      where.category = filters.category;
    }

    return await this.transactionsRepository.find({
      where,
      relations: ['account', 'budget', 'goal'],
      order: { date: 'DESC', createdAt: 'DESC' }
    });
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id },
      relations: ['account', 'user', 'budget', 'goal']
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async update(id: string, updateData: any): Promise<Transaction> {
    const transaction = await this.findById(id);
    
    // Handle balance adjustment if amount changes
    if (updateData.amount && updateData.amount !== transaction.amount) {
      const oldAmount = transaction.type === 'income' ? transaction.amount : -transaction.amount;
      const newAmount = (updateData.type || transaction.type) === 'income' ? updateData.amount : -updateData.amount;
      const difference = newAmount - oldAmount;
      
      await this.accountsService.updateBalance(transaction.account.id, difference);
    }

    await this.transactionsRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const transaction = await this.findById(id);
    
    // Reverse the balance change
    const amount = transaction.type === 'income' ? -transaction.amount : transaction.amount;
    await this.accountsService.updateBalance(transaction.account.id, amount);
    
    await this.transactionsRepository.remove(transaction);
  }

  async getTransactionSummary(userId: string, startDate: Date, endDate: Date): Promise<{
    income: number;
    expenses: number;
    net: number;
    transactionCount: number;
  }> {
    const transactions = await this.findByUser(userId, { startDate, endDate });
    
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      net: income - expenses,
      transactionCount: transactions.length
    };
  }
}
