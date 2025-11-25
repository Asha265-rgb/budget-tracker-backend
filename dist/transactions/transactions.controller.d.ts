import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto): Promise<import("./entities/transaction.entity").Transaction>;
    findByUser(userId: string, startDate?: string, endDate?: string, type?: string, category?: string): Promise<import("./entities/transaction.entity").Transaction[]>;
    findOne(id: string): Promise<import("./entities/transaction.entity").Transaction>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<import("./entities/transaction.entity").Transaction>;
    remove(id: string): Promise<void>;
    getSummary(userId: string, startDate: string, endDate: string): Promise<{
        income: number;
        expenses: number;
        net: number;
        transactionCount: number;
    }>;
}
