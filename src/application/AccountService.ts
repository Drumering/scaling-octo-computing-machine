import { Account } from "../domain/entities/Account";
import { AccountRepository } from "../domain/ports/AccountRepository";

export class AccountService {
    constructor(private readonly accountRepository: AccountRepository) { }

    async getAll(): Promise<Account[]> {
        return this.accountRepository.findAll()
    }

    async getById(id: string): Promise<Account | null> {
        return this.accountRepository.findById(id)
    }

    async create(account: { id: string, balance: number }): Promise<Account> {
        const newAccount: Account = {
            id: account.id,
            balance: account.balance,
        }
        return this.accountRepository.create(newAccount)
    }

    async update(updateAccount: Account): Promise<Account> {
        return this.accountRepository.update(updateAccount)
    }

    async delete(id: string): Promise<void> {
        return this.accountRepository.delete(id)
    }

    async reset(): Promise<void> {
        return this.accountRepository.reset()
    }
}