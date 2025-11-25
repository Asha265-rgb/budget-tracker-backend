import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async create(userId: string, accountData: Partial<Account>): Promise<Account> {
    const account = this.accountsRepository.create({
      ...accountData,
      user: { id: userId }
    });
    return await this.accountsRepository.save(account);
  }

  async findByUser(userId: string): Promise<Account[]> {
    return await this.accountsRepository.find({
      where: { user: { id: userId }, isDeleted: false },
      order: { createdAt: 'DESC' }
    });
  }

  async findById(id: string): Promise<Account> {
    const account = await this.accountsRepository.findOne({ 
      where: { id, isDeleted: false },
      relations: ['user']
    });
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async update(id: string, updateData: Partial<Account>): Promise<Account> {
    await this.accountsRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const account = await this.findById(id);
    if (account.balance !== 0) {
      throw new Error('Cannot delete account with non-zero balance');
    }
    account.isDeleted = true;
    await this.accountsRepository.save(account);
  }

  async updateBalance(accountId: string, amount: number): Promise<Account> {
    const account = await this.findById(accountId);
    account.balance += amount;
    return await this.accountsRepository.save(account);
  }

  async getTotalBalance(userId: string): Promise<number> {
    const accounts = await this.findByUser(userId);
    return accounts.reduce((total, account) => total + account.balance, 0);
  }
}
