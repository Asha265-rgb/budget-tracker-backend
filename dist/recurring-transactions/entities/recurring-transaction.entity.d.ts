import { User } from '../../users/entities/user.entity';
import { Account } from '../../accounts/entities/account.entity';
export declare class RecurringTransaction {
    id: string;
    description: string;
    amount: number;
    type: string;
    category: string;
    frequency: string;
    customDays: number;
    startDate: Date;
    endDate: Date;
    lastProcessed: Date;
    nextProcessingDate: Date;
    status: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    account: Account;
    isActive(): boolean;
    isIncome(): boolean;
    isExpense(): boolean;
    shouldProcessToday(): boolean;
    calculateNextDate(): Date;
}
