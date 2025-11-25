import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringTransactionsService } from './recurring-transactions.service';
import { RecurringTransactionsController } from './recurring-transactions.controller';
import { RecurringTransaction } from './entities/recurring-transaction.entity';
import { TransactionsModule } from '../transactions/transactions.module'; // ← ADD THIS LINE

@Module({
  imports: [
    TypeOrmModule.forFeature([RecurringTransaction]),
    TransactionsModule, // ← ADD THIS LINE
  ],
  controllers: [RecurringTransactionsController],
  providers: [RecurringTransactionsService],
  exports: [RecurringTransactionsService],
})
export class RecurringTransactionsModule {}
