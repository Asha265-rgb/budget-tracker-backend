export declare class CreateReportDto {
    name: string;
    type: string;
    filters: {
        startDate: string;
        endDate: string;
        categories?: string[];
        accounts?: string[];
        type?: string;
    };
    exportFormat?: string;
    userId: string;
}
