import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
export declare class BudgetsController {
    private readonly budgetsService;
    constructor(budgetsService: BudgetsService);
    create(createBudgetDto: CreateBudgetDto): Promise<import("./entities/budget.entity").Budget>;
    findByUser(userId: string): Promise<import("./entities/budget.entity").Budget[]>;
    findOne(id: string): Promise<import("./entities/budget.entity").Budget>;
    update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<import("./entities/budget.entity").Budget>;
    remove(id: string): Promise<void>;
}
