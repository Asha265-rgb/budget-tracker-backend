import { User } from '../../users/entities/user.entity';
import { Group } from './group.entity';
import { ExpenseSplit } from './expense-split.entity';
export declare class GroupMember {
    id: string;
    role: string;
    status: string;
    totalOwed: number;
    totalOwes: number;
    joinedAt: Date;
    updatedAt: Date;
    user: User;
    group: Group;
    expenseSplits: ExpenseSplit[];
    isOwner(): boolean;
    isAdmin(): boolean;
    isActive(): boolean;
    isPending(): boolean;
    getNetBalance(): number;
    owesMoney(): boolean;
    isOwedMoney(): boolean;
    isSettled(): boolean;
}
