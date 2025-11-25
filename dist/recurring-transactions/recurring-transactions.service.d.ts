import { Repository } from 'typeorm';
import { RecurringTransaction } from './entities/recurring-transaction.entity';
export declare class RecurringTransactionsService {
    private recurringTransactionsRepository;
    constructor(recurringTransactionsRepository: Repository<RecurringTransaction>);
    create(userId: string, recurringData: Partial<RecurringTransaction>): Promise<RecurringTransaction>;
    findByUser(userId: string): Promise<RecurringTransaction[]>;
    findById(id: string): Promise<RecurringTransaction>;
    update(id: string, updateData: Partial<RecurringTransaction>): Promise<RecurringTransaction>;
    delete(id: string): Promise<void>;
    getUpcomingTransactions(userId: string, days?: number): Promise<RecurringTransaction[]>;
}
