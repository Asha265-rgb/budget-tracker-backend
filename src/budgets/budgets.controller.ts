import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetsService.create(createBudgetDto.userId, createBudgetDto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.budgetsService.findByUser(userId);
  }

  // REMOVED the problematic progress endpoint entirely

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetsService.update(id, updateBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetsService.delete(id);
  }
}
