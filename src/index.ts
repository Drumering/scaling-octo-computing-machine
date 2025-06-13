import express from "express";
import { InMemoryAccountRepository } from "./infrastructure/InMemoryAccountRepository";
import { AccountService } from "./application/AccountService";
import { createAccountRouter } from "./interfaces/AccountController";

const app = express();
app.use(express.json())

const accountRepository = new InMemoryAccountRepository();
const accountService = new AccountService(accountRepository)
const accountRouter = createAccountRouter(accountService)

app.use('/', accountRouter)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
})