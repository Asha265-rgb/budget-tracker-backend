import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
export declare class Budget {
    id: string;
    name: string;
    amount: number;
    spent: number;
    period: string;
    category: string;
    startDate: Date;
    endDate: Date;
    rolloverEnabled: boolean;
    rolloverAmount: number;
    status: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    transactions: Transaction[];
    getRemaining(): number;
    getProgressPercentage(): number;
    isOverspent(): boolean;
    canRollover(): boolean;
    addSpending(amount: number): void;
    isActive(): boolean;
    isMonthly(): boolean;
    isYearly(): boolean;
}
