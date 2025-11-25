import { User } from '../../users/entities/user.entity';
import { Group } from './group.entity';
import { ExpenseSplit } from './expense-split.entity';
export declare class GroupExpense {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: Date;
    splitType: string;
    receiptUrl: string;
    notes: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    paidBy: User;
    group: Group;
    splits: ExpenseSplit[];
    isSettled(): boolean;
    isPending(): boolean;
    getSettledSplits(): ExpenseSplit[];
    getPendingSplits(): ExpenseSplit[];
    markAsSettled(): void;
    canEdit(): boolean;
    getTotalSettled(): number;
    isFullySettled(): boolean;
}
