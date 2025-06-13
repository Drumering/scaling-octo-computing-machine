import { Account } from '../entities/Account';

export interface AccountRepository {
    findAll(): Promise<Account[]>
    findById(id: string): Promise<Account | null>
    create(account: Account): Promise<Account>
    update(updateAccount: Account): Promise<Account>
    delete(id: string): Promise<void>
    reset(): Promise<void>
}