import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecurringTransactionsService } from './recurring-transactions.service';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';

@Controller('recurring-transactions')
export class RecurringTransactionsController {
  constructor(private readonly recurringTransactionsService: RecurringTransactionsService) {}

  @Post('user/:userId') // ← Add userId to route
  create(@Param('userId') userId: string, @Body() createRecurringTransactionDto: CreateRecurringTransactionDto) {
    return this.recurringTransactionsService.create(userId, createRecurringTransactionDto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.recurringTransactionsService.findByUser(userId);
  }

  @Get('upcoming/user/:userId')
  getUpcoming(@Param('userId') userId: string, @Query('days') days: number = 30) {
    return this.recurringTransactionsService.getUpcomingTransactions(userId, days);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recurringTransactionsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecurringTransactionDto: UpdateRecurringTransactionDto) {
    return this.recurringTransactionsService.update(id, updateRecurringTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recurringTransactionsService.delete(id);
  }
}
