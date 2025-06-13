import { Request, Response, Router } from 'express';
import { AccountService } from '../application/AccountService';
import { isValidEvent } from '../shared/validators/EventValidators';
import { EventType } from '../shared/types/EventType';

export function createAccountRouter(accountService: AccountService): Router {
    const router = Router();

    router.post('/reset', async (_req: Request, res: Response) => {
        accountService.reset();
        res.status(200).send('OK');
    });

    router.get('/balance', async (req: Request, res: Response) => {
        const id = req.query.account_id;
        if (typeof id !== 'string') {
            res.status(400).send('Invalid account_id');
            return;
        }
        const account = await accountService.getById(id);
        if (!account) {
            res.status(404).send(0);
            return;
        }
        res.status(200).send(account.balance);
    });

    router.post('/event', async (req: Request, res: Response) => {
        const event = req.body;
        if (!isValidEvent(event)) {
            res.status(400).send('Invalid event format');
            return;
        }
        const { type, destination, amount, origin } = event;
        if (type === EventType.DEPOSIT) {
            const account = await accountService.getById(destination);
            if (!account) {
                const createdAccount = await accountService.create({ id: destination, balance: amount });
                res.status(201).send({
                    destination: createdAccount,
                });
                return;
            }
            const updatedAccount = await accountService.update({
                id: destination,
                balance: account.balance + amount,
            });
            res.status(201).send({
                destination: updatedAccount,
            });
        }
        if (type === EventType.WITHDRAW) {
            const account = await accountService.getById(origin);
            if (!account) {
                res.status(404).send(0);
                return;
            }
            if (account.balance < amount) {
                res.status(400).send('Insufficient funds');
                return;
            }
            const updatedAccount = await accountService.update({
                id: origin,
                balance: account.balance - amount,
            });
            res.status(201).send({
                origin: updatedAccount,
            });

        }
        if (type === EventType.TRANSFER) {
            const originAccount = await accountService.getById(origin);
            let destinationAccount = await accountService.getById(destination);
            if (!originAccount) {
                res.status(404).send(0);
                return;
            }
            if (originAccount.balance < amount) {
                res.status(400).send('Insufficient funds');
                return;
            }
            if (!destinationAccount) {
                destinationAccount = await accountService.create({ id: destination, balance: 0 });
            }
            const updatedOrigin = await accountService.update({
                id: origin,
                balance: originAccount.balance - amount,
            });
            const updatedDestination = await accountService.update({
                id: destination,
                balance: destinationAccount.balance + amount,
            });

            res.status(201).send({
                origin: updatedOrigin,
                destination: updatedDestination
            });
        }
    });

    return router;
}