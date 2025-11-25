import { Goal } from './goal.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
export declare class GoalTransaction {
    id: string;
    amount: number;
    date: Date;
    notes: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    goal: Goal;
    linkedTransaction: Transaction;
    isSavings(): boolean;
    isWithdrawal(): boolean;
}
