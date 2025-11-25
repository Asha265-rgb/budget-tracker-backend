import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
export declare class Account {
    id: string;
    name: string;
    type: string;
    balance: number;
    currency: string;
    accountNumber: string;
    bankName: string;
    status: string;
    isDeleted: boolean;
    color: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    transactions: Transaction[];
    updateBalance(amount: number): void;
    canDelete(): boolean;
    isActive(): boolean;
    isBankAccount(): boolean;
    isCreditCard(): boolean;
    isCash(): boolean;
}
