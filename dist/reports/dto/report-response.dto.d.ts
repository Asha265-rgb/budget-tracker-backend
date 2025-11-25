export declare class ReportResponseDto {
    id: string;
    name: string;
    type: string;
    filters: any;
    data: any;
    status: string;
    exportedUrl: string;
    exportFormat: string;
    createdAt: Date;
    updatedAt: Date;
    get canExport(): boolean;
    get isSpendingReport(): boolean;
    get isIncomeVsExpenseReport(): boolean;
}
