import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';
export declare class BudgetsService {
    private budgetsRepository;
    constructor(budgetsRepository: Repository<Budget>);
    create(userId: string, budgetData: Partial<Budget>): Promise<Budget>;
    findByUser(userId: string): Promise<Budget[]>;
    findById(id: string): Promise<Budget>;
    update(id: string, updateData: Partial<Budget>): Promise<Budget>;
    delete(id: string): Promise<void>;
}
