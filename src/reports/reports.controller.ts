import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('user/:userId') // ← Add userId to route
  create(@Param('userId') userId: string, @Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(userId, createReportDto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.reportsService.findByUser(userId);
  }

  @Get(':id/generate')
  generateReport(@Param('id') id: string) {
    return this.reportsService.generateReportData(id);
  }

  @Get(':id/export')
  exportReport(@Param('id') id: string, @Query('format') format: string = 'pdf') {
    return this.reportsService.exportReport(id, format);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.delete(id);
  }
}
