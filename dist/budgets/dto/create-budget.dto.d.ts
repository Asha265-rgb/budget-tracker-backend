export declare class CreateBudgetDto {
    name: string;
    amount: number;
    period: string;
    category: string;
    startDate: Date;
    endDate: Date;
    rolloverEnabled?: boolean;
    color?: string;
    userId: string;
}
