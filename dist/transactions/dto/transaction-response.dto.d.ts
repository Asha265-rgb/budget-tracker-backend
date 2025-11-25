export declare class TransactionResponseDto {
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
    accountId: string;
    budgetId: string;
    goalId: string;
    get signedAmount(): number;
}
