import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
export declare class GoalsController {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    create(createGoalDto: CreateGoalDto): Promise<import("./entities/goal.entity").Goal>;
    addSavings(id: string, body: {
        amount: number;
        notes?: string;
    }): Promise<import("./entities/goal.entity").Goal>;
    findByUser(userId: string): Promise<import("./entities/goal.entity").Goal[]>;
    getProgress(userId: string): Promise<any[]>;
    getTransactions(id: string): Promise<import("./entities/goal-transaction.entity").GoalTransaction[]>;
    findOne(id: string): Promise<import("./entities/goal.entity").Goal>;
    update(id: string, updateGoalDto: UpdateGoalDto): Promise<import("./entities/goal.entity").Goal>;
    remove(id: string): Promise<void>;
}
