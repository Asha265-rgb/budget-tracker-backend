export declare class RecurringTransactionResponseDto {
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
    accountId: string;
    get isActive(): boolean;
    get isIncome(): boolean;
    get isExpense(): boolean;
}
