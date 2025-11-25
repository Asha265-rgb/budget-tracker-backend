import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.create(createGoalDto.userId, createGoalDto);
  }

  @Post(':id/savings')
  addSavings(@Param('id') id: string, @Body() body: { amount: number; notes?: string }) {
    return this.goalsService.addSavings(id, body.amount, body.notes);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.goalsService.findByUser(userId);
  }

  @Get('progress/user/:userId')
  getProgress(@Param('userId') userId: string) {
    return this.goalsService.getGoalProgress(userId);
  }

  @Get(':id/transactions')
  getTransactions(@Param('id') id: string) {
    return this.goalsService.getGoalTransactions(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(id, updateGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalsService.delete(id);
  }
}
