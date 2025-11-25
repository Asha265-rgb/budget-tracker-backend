import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { GroupMember } from './entities/group-member.entity';
import { GroupExpense } from './entities/group-expense.entity';
import { ExpenseSplit } from './entities/expense-split.entity';
import { UsersService } from '../users/users.service';
import { UpdateGroupDto } from './dto/update-group.dto';
export interface GroupBalance {
    userId: string;
    userName: string;
    totalOwed: number;
    totalOwes: number;
    netBalance: number;
}
export declare class GroupsService {
    private groupsRepository;
    private groupMembersRepository;
    private groupExpensesRepository;
    private expenseSplitsRepository;
    private usersService;
    constructor(groupsRepository: Repository<Group>, groupMembersRepository: Repository<GroupMember>, groupExpensesRepository: Repository<GroupExpense>, expenseSplitsRepository: Repository<ExpenseSplit>, usersService: UsersService);
    findAll(): Promise<Group[]>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group>;
    delete(id: string): Promise<{
        message: string;
    }>;
    create(userId: string, groupData: Partial<Group>): Promise<Group>;
    findById(id: string): Promise<Group>;
    findByUser(userId: string): Promise<Group[]>;
    addMember(groupId: string, userId: string, role?: string): Promise<GroupMember>;
    acceptInvite(groupId: string, userId: string): Promise<GroupMember>;
    createExpense(groupId: string, userId: string, expenseData: Partial<GroupExpense>): Promise<GroupExpense>;
    private createExpenseSplits;
    settleExpense(expenseId: string, splitId: string, userId: string): Promise<ExpenseSplit>;
    getGroupBalance(groupId: string): Promise<GroupBalance[]>;
    private getGroupMember;
}
