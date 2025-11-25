export declare class GoalResponseDto {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: Date;
    startDate: Date;
    status: string;
    category: string;
    color: string;
    icon: string;
    notes: string;
    isUnrealistic: boolean;
    createdAt: Date;
    updatedAt: Date;
    get progressPercentage(): number;
    get remainingAmount(): number;
    get daysRemaining(): number;
}
