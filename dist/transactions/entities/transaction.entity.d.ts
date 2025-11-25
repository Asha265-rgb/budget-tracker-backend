import { User } from '../../users/entities/user.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Budget } from '../../budgets/entities/budget.entity';
import { Goal } from '../../goals/entities/goal.entity';
export declare class Transaction {
    id: string;
    description: string;
    amount: number;
    type: string;
    category: string;
    date: Date;
    isRecurring: boolean;
    recurringId: string;
    notes: string;
    tags: string[];
    receiptUrl: string;
    isSplit: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    account: Account;
    budget: Budget;
    goal: Goal;
    isIncome(): boolean;
    isExpense(): boolean;
    getSignedAmount(): number;
}
