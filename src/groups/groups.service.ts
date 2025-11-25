import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    @InjectRepository(GroupMember)
    private groupMembersRepository: Repository<GroupMember>,
    @InjectRepository(GroupExpense)
    private groupExpensesRepository: Repository<GroupExpense>,
    @InjectRepository(ExpenseSplit)
    private expenseSplitsRepository: Repository<ExpenseSplit>,
    private usersService: UsersService,
  ) {}

  // ADD THESE MISSING METHODS:

  async findAll(): Promise<Group[]> {
    return this.groupsRepository.find({
      relations: ['createdBy', 'members', 'members.user']
    });
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupsRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    
    Object.assign(group, updateGroupDto);
    return this.groupsRepository.save(group);
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.groupsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Group not found');
    }
    return { message: 'Group deleted successfully' };
  }

  // YOUR EXISTING METHODS:

  async create(userId: string, groupData: Partial<Group>): Promise<Group> {
    const group = this.groupsRepository.create({
      ...groupData,
      createdBy: { id: userId }
    });

    const savedGroup = await this.groupsRepository.save(group);
    
    // Add creator as owner
    await this.addMember(savedGroup.id, userId, 'owner');

    return savedGroup;
  }

  async findById(id: string): Promise<Group> {
    const group = await this.groupsRepository.findOne({
      where: { id },
      relations: ['createdBy', 'members', 'members.user', 'expenses']
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async findByUser(userId: string): Promise<Group[]> {
    const memberships = await this.groupMembersRepository.find({
      where: { user: { id: userId }, status: 'active' },
      relations: ['group', 'group.createdBy']
    });
    return memberships.map(membership => membership.group);
  }

  async addMember(groupId: string, userId: string, role: string = 'member'): Promise<GroupMember> {
    const group = await this.findById(groupId);
    
    const existingMember = await this.groupMembersRepository.findOne({
      where: { group: { id: groupId }, user: { id: userId } }
    });

    if (existingMember) {
      throw new ConflictException('User is already a member of this group');
    }

    const member = this.groupMembersRepository.create({
      role,
      status: 'pending',
      user: { id: userId },
      group: { id: groupId }
    });

    return await this.groupMembersRepository.save(member);
  }

  async acceptInvite(groupId: string, userId: string): Promise<GroupMember> {
    const member = await this.groupMembersRepository.findOne({
      where: { group: { id: groupId }, user: { id: userId }, status: 'pending' }
    });

    if (!member) {
      throw new NotFoundException('Invitation not found');
    }

    member.status = 'active';
    member.joinedAt = new Date();
    return await this.groupMembersRepository.save(member);
  }

  async createExpense(groupId: string, userId: string, expenseData: Partial<GroupExpense>): Promise<GroupExpense> {
    const group = await this.findById(groupId);
    const member = await this.getGroupMember(groupId, userId);

    if (!member.isActive()) {
      throw new ConflictException('Only active members can create expenses');
    }

    // Validate required fields
    if (!expenseData.amount || !expenseData.description) {
      throw new BadRequestException('Amount and description are required');
    }

    const expense = this.groupExpensesRepository.create({
      ...expenseData,
      splitType: expenseData.splitType || 'equal', // Provide default value
      paidBy: { id: userId },
      group: { id: groupId }
    });

    const savedExpense = await this.groupExpensesRepository.save(expense);
    
    // Create expense splits
    await this.createExpenseSplits(savedExpense.id, expense.splitType, expenseData.amount!);

    return savedExpense;
  }

  private async createExpenseSplits(expenseId: string, splitType: string, totalAmount: number): Promise<void> {
    const expense = await this.groupExpensesRepository.findOne({
      where: { id: expenseId },
      relations: ['group', 'group.members', 'group.members.user']
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    const activeMembers = expense.group.members.filter(member => member.isActive());
    
    if (splitType === 'equal') {
      const splitAmount = totalAmount / activeMembers.length;
      
      for (const member of activeMembers) {
        const split = this.expenseSplitsRepository.create({
          amount: splitAmount,
          expense: { id: expenseId },
          member: { id: member.id }
        });
        await this.expenseSplitsRepository.save(split);
      }
    }
    // Add other split types (percentage, custom) as needed
  }

  async settleExpense(expenseId: string, splitId: string, userId: string): Promise<ExpenseSplit> {
    const split = await this.expenseSplitsRepository.findOne({
      where: { id: splitId },
      relations: ['member', 'member.user', 'expense']
    });

    if (!split) {
      throw new NotFoundException('Expense split not found');
    }

    if (!split.belongsToUser(userId)) {
      throw new ConflictException('You can only settle your own splits');
    }

    split.markAsSettled();
    return await this.expenseSplitsRepository.save(split);
  }

  async getGroupBalance(groupId: string): Promise<GroupBalance[]> {
    const group = await this.findById(groupId);
    const balances: GroupBalance[] = [];

    for (const member of group.members) {
      if (member.isActive()) {
        balances.push({
          userId: member.user.id,
          userName: `${member.user.firstName} ${member.user.lastName}`,
          totalOwed: member.totalOwed,
          totalOwes: member.totalOwes,
          netBalance: member.getNetBalance()
        });
      }
    }

    return balances;
  }

  private async getGroupMember(groupId: string, userId: string): Promise<GroupMember> {
    const member = await this.groupMembersRepository.findOne({
      where: { group: { id: groupId }, user: { id: userId } },
      relations: ['user']
    });

    if (!member) {
      throw new NotFoundException('User is not a member of this group');
    }

    return member;
  }
}
