import { Account } from '../domain/entities/Account';
import { AccountRepository } from '../domain/ports/AccountRepository';

export class InMemoryAccountRepository implements AccountRepository {
    private accounts: Account[] = [];
    async findAll(): Promise<Account[]> {
        return this.accounts;
    }
    async findById(id: string): Promise<Account | null> {
        const account = this.accounts.find(account => account.id === id);
        return account ?? null;
    }
    async create(account: Account): Promise<Account> {
        this.accounts.push(account);
        return account;
    }
    async update(updateAccount: Account): Promise<Account> {
        const index = this.accounts.findIndex(account => account.id === updateAccount.id);
        if (index === -1) throw new Error('Account Not Found');
        this.accounts[index] = updateAccount;
        return updateAccount;
    }
    async delete(id: string): Promise<void> {
        this.accounts = this.accounts.filter(account => account.id !== id);
    }
    async reset(): Promise<void> {
        this.accounts = [];
    }
}