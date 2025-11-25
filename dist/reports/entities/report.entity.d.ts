import { User } from '../../users/entities/user.entity';
export declare class Report {
    id: string;
    name: string;
    type: string;
    filters: {
        startDate: string;
        endDate: string;
        categories?: string[];
        accounts?: string[];
        type?: string;
    };
    data: any;
    status: string;
    exportedUrl: string;
    exportFormat: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    isSpendingReport(): boolean;
    isIncomeVsExpenseReport(): boolean;
    isCashFlowReport(): boolean;
    isNetWorthReport(): boolean;
    canExport(): boolean;
}
