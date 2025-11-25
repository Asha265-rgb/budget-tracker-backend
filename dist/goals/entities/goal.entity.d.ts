import { User } from '../../users/entities/user.entity';
import { GoalTransaction } from './goal-transaction.entity';
export declare class Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: Date;
    startDate: Date;
    status: string;
    category: string;
    color: string;
    icon: string;
    notes: string;
    isUnrealistic: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    transactions: GoalTransaction[];
    getProgressPercentage(): number;
    getRemainingAmount(): number;
    getDaysRemaining(): number;
    getMonthlySavingsNeeded(): number;
    isCompleted(): boolean;
    isOverdue(): boolean;
    addAmount(amount: number): void;
}
