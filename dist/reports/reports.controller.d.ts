import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    create(userId: string, createReportDto: CreateReportDto): Promise<import("./entities/report.entity").Report>;
    findByUser(userId: string): Promise<import("./entities/report.entity").Report[]>;
    generateReport(id: string): Promise<import("./entities/report.entity").Report>;
    exportReport(id: string, format?: string): Promise<import("./entities/report.entity").Report>;
    findOne(id: string): Promise<import("./entities/report.entity").Report>;
    update(id: string, updateReportDto: UpdateReportDto): Promise<import("./entities/report.entity").Report>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
