 import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './entities/group.entity';
import { GroupMember } from './entities/group-member.entity';
import { GroupExpense } from './entities/group-expense.entity';
import { ExpenseSplit } from './entities/expense-split.entity';
import { UsersModule } from '../users/users.module'; // ← ADD THIS LINE

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GroupMember, GroupExpense, ExpenseSplit]),
    UsersModule, // ← ADD THIS LINE
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
