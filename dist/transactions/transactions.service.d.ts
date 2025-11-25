import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { AccountsService } from '../accounts/accounts.service';
export declare class TransactionsService {
    private transactionsRepository;
    private accountsService;
    constructor(transactionsRepository: Repository<Transaction>, accountsService: AccountsService);
    create(userId: string, transactionData: any): Promise<Transaction>;
    findByUser(userId: string, filters?: {
        startDate?: Date;
        endDate?: Date;
        type?: string;
        category?: string;
    }): Promise<Transaction[]>;
    findById(id: string): Promise<Transaction>;
    update(id: string, updateData: any): Promise<Transaction>;
    delete(id: string): Promise<void>;
    getTransactionSummary(userId: string, startDate: Date, endDate: Date): Promise<{
        income: number;
        expenses: number;
        net: number;
        transactionCount: number;
    }>;
}
