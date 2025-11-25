export declare class ExpenseSplitResponseDto {
    id: string;
    amount: number;
    percentage: number;
    status: string;
    settledAt: Date;
    createdAt: Date;
    updatedAt: Date;
    memberId: string;
    expenseId: string;
    get isSettled(): boolean;
    get isPending(): boolean;
    get owedAmount(): number;
}
