export declare class BudgetResponseDto {
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
    get remaining(): number;
    get progressPercentage(): number;
    get isOverspent(): boolean;
}
