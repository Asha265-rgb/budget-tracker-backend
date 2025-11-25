import { GroupMember } from './group-member.entity';
import { GroupExpense } from './group-expense.entity';
export declare class ExpenseSplit {
    id: string;
    amount: number;
    percentage: number;
    status: string;
    settledAt: Date;
    createdAt: Date;
    updatedAt: Date;
    member: GroupMember;
    expense: GroupExpense;
    isSettled(): boolean;
    isPending(): boolean;
    markAsSettled(): void;
    getOwedAmount(): number;
    belongsToUser(userId: string): boolean;
}
