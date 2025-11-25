export declare class GroupExpenseResponseDto {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: Date;
    splitType: string;
    receiptUrl: string;
    notes: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    paidById: string;
    groupId: string;
    get isSettled(): boolean;
    get isPending(): boolean;
    get canEdit(): boolean;
}
