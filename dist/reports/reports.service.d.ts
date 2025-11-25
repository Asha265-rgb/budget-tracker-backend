import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportsService {
    private reportsRepository;
    constructor(reportsRepository: Repository<Report>);
    update(id: string, updateReportDto: UpdateReportDto): Promise<Report>;
    delete(id: string): Promise<{
        message: string;
    }>;
    create(userId: string, createReportDto: CreateReportDto): Promise<Report>;
    findByUser(userId: string): Promise<Report[]>;
    findById(id: string): Promise<Report>;
    generateReportData(reportId: string): Promise<Report>;
    private generateSpendingByCategoryData;
    private generateIncomeVsExpenseData;
    private generateCashFlowData;
    private generateNetWorthData;
    exportReport(reportId: string, format?: string): Promise<Report>;
}
