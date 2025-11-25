export declare class CreateRecurringTransactionDto {
    description: string;
    amount: number;
    type: string;
    category: string;
    frequency: string;
    customDays?: number;
    startDate: Date;
    endDate?: Date;
    notes?: string;
    accountId: string;
}
