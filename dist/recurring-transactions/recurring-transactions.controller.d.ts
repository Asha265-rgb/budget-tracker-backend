import { RecurringTransactionsService } from './recurring-transactions.service';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';
export declare class RecurringTransactionsController {
    private readonly recurringTransactionsService;
    constructor(recurringTransactionsService: RecurringTransactionsService);
    create(userId: string, createRecurringTransactionDto: CreateRecurringTransactionDto): Promise<import("./entities/recurring-transaction.entity").RecurringTransaction>;
    findByUser(userId: string): Promise<import("./entities/recurring-transaction.entity").RecurringTransaction[]>;
    getUpcoming(userId: string, days?: number): Promise<import("./entities/recurring-transaction.entity").RecurringTransaction[]>;
    findOne(id: string): Promise<import("./entities/recurring-transaction.entity").RecurringTransaction>;
    update(id: string, updateRecurringTransactionDto: UpdateRecurringTransactionDto): Promise<import("./entities/recurring-transaction.entity").RecurringTransaction>;
    remove(id: string): Promise<void>;
}
