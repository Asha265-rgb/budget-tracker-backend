import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
export declare class AccountsService {
    private accountsRepository;
    constructor(accountsRepository: Repository<Account>);
    create(userId: string, accountData: Partial<Account>): Promise<Account>;
    findByUser(userId: string): Promise<Account[]>;
    findById(id: string): Promise<Account>;
    update(id: string, updateData: Partial<Account>): Promise<Account>;
    delete(id: string): Promise<void>;
    updateBalance(accountId: string, amount: number): Promise<Account>;
    getTotalBalance(userId: string): Promise<number>;
}
