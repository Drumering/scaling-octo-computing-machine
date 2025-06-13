import request from 'supertest';
import express from 'express';
import { InMemoryAccountRepository } from '../../src/infrastructure/InMemoryAccountRepository';
import { AccountService } from '../../src/application/AccountService';
import { createAccountRouter } from '../../src/interfaces/AccountController';

function createTestApp() {
    const app = express();
    app.use(express.json());
    const repo = new InMemoryAccountRepository();
    const service = new AccountService(repo);
    app.use('/', createAccountRouter(service));
    return app;
}

describe('AccountController Integration', () => {
    let app: express.Express;

    beforeEach(() => {
        app = createTestApp();
    });

    it('should reset state', async () => {
        const res = await request(app).post('/reset');
        expect(res.status).toBe(200);
        expect(res.text).toBe('OK');
    });

    it('should return 0 for non-existent account balance', async () => {
        const res = await request(app).get('/balance').query({ account_id: '999' });
        expect(res.status).toBe(404);
        expect(res.text).toBe('0');
    });

    it('should deposit to new account', async () => {
        const res = await request(app)
            .post('/event')
            .send({ type: 'deposit', destination: '100', amount: 10 });
        expect(res.status).toBe(201);
        expect(res.body).toEqual({ destination: { id: '100', balance: 10 } });
    });

    it('should withdraw from existing account', async () => {
        await request(app).post('/event').send({ type: 'deposit', destination: '200', amount: 20 });
        const res = await request(app)
            .post('/event')
            .send({ type: 'withdraw', origin: '200', amount: 5 });
        expect(res.status).toBe(201);
        expect(res.body).toEqual({ origin: { id: '200', balance: 15 } });
    });

    it('should transfer between accounts', async () => {
        await request(app).post('/event').send({ type: 'deposit', destination: '300', amount: 15 });
        const res = await request(app)
            .post('/event')
            .send({ type: 'transfer', origin: '300', destination: '400', amount: 10 });
        expect(res.status).toBe(201);
        expect(res.body).toEqual({
            origin: { id: '300', balance: 5 },
            destination: { id: '400', balance: 10 }
        });
    });
});