import { AccountService } from '../../src/application/AccountService';
import { InMemoryAccountRepository } from '../../src/infrastructure/InMemoryAccountRepository';

describe('AccountService', () => {
    let service: AccountService;

    beforeEach(() => {
        service = new AccountService(new InMemoryAccountRepository());
    });

    it('should create and retrieve an account', async () => {
        await service.create({ id: '1', balance: 100 });
        const account = await service.getById('1');
        expect(account).toEqual({ id: '1', balance: 100 });
    });

    it('should update account balance', async () => {
        await service.create({ id: '2', balance: 50 });
        await service.update({ id: '2', balance: 80 });
        const account = await service.getById('2');
        expect(account?.balance).toBe(80);
    });

    it('should delete an account', async () => {
        await service.create({ id: '3', balance: 10 });
        await service.delete('3');
        const account = await service.getById('3');
        expect(account).toBeNull();
    });

    it('should reset all accounts', async () => {
        await service.create({ id: '4', balance: 10 });
        await service.reset();
        const all = await service.getAll();
        expect(all).toHaveLength(0);
    });
});