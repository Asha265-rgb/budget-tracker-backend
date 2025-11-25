import { User } from '../../users/entities/user.entity';
import { GroupMember } from './group-member.entity';
import { GroupExpense } from './group-expense.entity';
export declare class Group {
    id: string;
    name: string;
    description: string;
    status: string;
    currency: string;
    color: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
    members: GroupMember[];
    expenses: GroupExpense[];
    isActive(): boolean;
    isFrozen(): boolean;
    getActiveMembers(): GroupMember[];
    canAddExpense(): boolean;
    freezeGroup(): void;
    activateGroup(): void;
}
