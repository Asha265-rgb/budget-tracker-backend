"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_entity_1 = require("./entities/report.entity");
let ReportsService = class ReportsService {
    constructor(reportsRepository) {
        this.reportsRepository = reportsRepository;
    }
    async update(id, updateReportDto) {
        const report = await this.findById(id);
        Object.assign(report, updateReportDto);
        return this.reportsRepository.save(report);
    }
    async delete(id) {
        const result = await this.reportsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Report not found');
        }
        return { message: 'Report deleted successfully' };
    }
    async create(userId, createReportDto) {
        const report = this.reportsRepository.create({
            ...createReportDto,
            user: { id: userId }
        });
        return await this.reportsRepository.save(report);
    }
    async findByUser(userId) {
        return await this.reportsRepository.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' }
        });
    }
    async findById(id) {
        const report = await this.reportsRepository.findOne({
            where: { id },
            relations: ['user']
        });
        if (!report) {
            throw new common_1.NotFoundException('Report not found');
        }
        return report;
    }
    async generateReportData(reportId) {
        const report = await this.findById(reportId);
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
    generateSpendingByCategoryData(filters) {
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
    generateIncomeVsExpenseData(filters) {
        return {
            income: 3000,
            expenses: 1500,
            savings: 1500,
            savingsRate: 50,
            period: filters
        };
    }
    generateCashFlowData(filters) {
        return {
            monthlyData: [
                { month: 'Jan', income: 3000, expenses: 1500 },
                { month: 'Feb', income: 3200, expenses: 1700 },
                { month: 'Mar', income: 2800, expenses: 1400 }
            ],
            period: filters
        };
    }
    generateNetWorthData(filters) {
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
    async exportReport(reportId, format = 'pdf') {
        const report = await this.findById(reportId);
        if (!report.canExport()) {
            throw new common_1.BadRequestException('Report cannot be exported');
        }
        report.exportFormat = format;
        report.exportedUrl = `/exports/report-${reportId}.${format}`;
        report.status = 'exported';
        return await this.reportsRepository.save(report);
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map