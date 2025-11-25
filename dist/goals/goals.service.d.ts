import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';
import { GoalTransaction } from './entities/goal-transaction.entity';
export declare class GoalsService {
    private goalsRepository;
    private goalTransactionsRepository;
    constructor(goalsRepository: Repository<Goal>, goalTransactionsRepository: Repository<GoalTransaction>);
    create(userId: string, goalData: Partial<Goal>): Promise<Goal>;
    findByUser(userId: string): Promise<Goal[]>;
    findById(id: string): Promise<Goal>;
    update(id: string, updateData: Partial<Goal>): Promise<Goal>;
    delete(id: string): Promise<void>;
    addSavings(goalId: string, amount: number, notes?: string): Promise<Goal>;
    getGoalProgress(userId: string): Promise<any[]>;
    private checkIfUnrealistic;
    getGoalTransactions(goalId: string): Promise<GoalTransaction[]>;
}
