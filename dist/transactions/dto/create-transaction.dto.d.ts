export declare class CreateTransactionDto {
    description: string;
    amount: number;
    type: string;
    category: string;
    date: Date;
    isRecurring?: boolean;
    recurringId?: string;
    notes?: string;
    tags?: string[];
    receiptUrl?: string;
    isSplit?: boolean;
    accountId: string;
    budgetId?: string;
    goalId?: string;
    userId: string;
}
