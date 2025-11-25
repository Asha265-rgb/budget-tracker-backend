import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  // ADD THESE MISSING METHODS:

  async update(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.findById(id);
    Object.assign(report, updateReportDto);
    return this.reportsRepository.save(report);
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.reportsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Report not found');
    }
    return { message: 'Report deleted successfully' };
  }

  // YOUR EXISTING METHODS (add these if they don't exist):

  async create(userId: string, createReportDto: CreateReportDto): Promise<Report> {
    const report = this.reportsRepository.create({
      ...createReportDto,
      user: { id: userId }
    });
    return await this.reportsRepository.save(report);
  }

  async findByUser(userId: string): Promise<Report[]> {
    return await this.reportsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    });
  }

  async findById(id: string): Promise<Report> {
    const report = await this.reportsRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  async generateReportData(reportId: string): Promise<Report> {
    const report = await this.findById(reportId);
    
    // Simulate report data generation based on report type
    // In a real application, you would query your database here
    switch (report.type) {
      case 'spending_by_category':
        report.data = this.generateSpendingByCategoryData(report.filters);
        break;
      case 'income_vs_expense':
        report.data = this.generateIncomeVsExpenseData(report.filters);
        break;
      case 'cash_flow':
        report.data = this.generateCashFlowData(report.filters);
        break;
      case 'net_worth':
        report.data = this.generateNetWorthData(report.filters);
        break;
    }

    report.status = 'saved';
    return await this.reportsRepository.save(report);
  }

  // Mock data generation methods (replace with actual database queries)
  private generateSpendingByCategoryData(filters: any): any {
    return {
      categories: [
        { name: 'Food', amount: 450, percentage: 30 },
        { name: 'Transport', amount: 300, percentage: 20 },
        { name: 'Entertainment', amount: 250, percentage: 16.7 },
        { name: 'Utilities', amount: 200, percentage: 13.3 },
        { name: 'Other', amount: 300, percentage: 20 }
      ],
      total: 1500,
      period: filters
    };
  }

  private generateIncomeVsExpenseData(filters: any): any {
    return {
      income: 3000,
      expenses: 1500,
      savings: 1500,
      savingsRate: 50,
      period: filters
    };
  }

  private generateCashFlowData(filters: any): any {
    return {
      monthlyData: [
        { month: 'Jan', income: 3000, expenses: 1500 },
        { month: 'Feb', income: 3200, expenses: 1700 },
        { month: 'Mar', income: 2800, expenses: 1400 }
      ],
      period: filters
    };
  }

  private generateNetWorthData(filters: any): any {
    return {
      assets: 25000,
      liabilities: 5000,
      netWorth: 20000,
      breakdown: {
        cash: 5000,
        investments: 15000,
        property: 5000,
        loans: -3000,
        creditCards: -2000
      },
      period: filters
    };
  }

  async exportReport(reportId: string, format: string = 'pdf'): Promise<Report> {
    const report = await this.findById(reportId);
    
    if (!report.canExport()) {
      throw new BadRequestException('Report cannot be exported');
    }

    // Simulate export process
    report.exportFormat = format;
    report.exportedUrl = `/exports/report-${reportId}.${format}`;
    report.status = 'exported';

    return await this.reportsRepository.save(report);
  }
}
