# EBANX Assessment Project

This project is a simple RESTful API built with Node.js, Express, and TypeScript. It simulates basic bank account operations such as deposit, withdraw, transfer, and balance inquiry. All data is stored in memory, making it ideal for demonstration and testing.

## Project Structure

```
ebanx-assessment/
├── coverage/                  # Code coverage reports (auto-generated)
├── src/
│   ├── application/
│   │   └── AccountService.ts          # Handles business logic for account operations
│   ├── domain/
│   │   └── ports/
│   │       └── AccountRepository.ts   # Interface for account data storage
│   ├── infrastructure/
│   │   └── InMemoryAccountRepository.ts # In-memory implementation of AccountRepository
│   ├── interfaces/
│   │   └── AccountController.ts       # Express router/controllers for API endpoints
│   ├── shared/
│   │   ├── types/
│   │   │   └── EventType.ts           # Event type constants
│   │   └── validators/
│   │       └── EventValidators.ts     # Input validation for events
│   └── index.ts                       # Express app entry point
├── tests/
│   ├── integration/
│   │   └── AccountController.test.ts  # Integration tests for API endpoints
│   └── unit/
│       └── AccountService.test.ts     # Unit tests for business logic
├── .gitignore
├── eslint.config.js                   # ESLint configuration
├── jest.config.ts                     # Jest configuration for tests and coverage
├── package.json                       # Project metadata, dependencies, and scripts
├── README.md                          # Project documentation
└── tsconfig.json                      # TypeScript compiler configuration
```

## File Overview

- **src/application/AccountService.ts**  
  Contains the main business logic for handling account operations.

- **src/domain/ports/AccountRepository.ts**  
  Defines the interface for account data storage, allowing different storage implementations.

- **src/infrastructure/InMemoryAccountRepository.ts**  
  Provides an in-memory implementation of the AccountRepository interface, storing accounts in memory.

- **src/interfaces/AccountController.ts**  
  Sets up Express routes and controllers for handling API requests related to accounts.

- **src/shared/types/EventType.ts**  
  Defines constants for different event types (e.g., deposit, withdraw, transfer).

- **src/shared/validators/EventValidators.ts**  
  Contains validation logic for incoming event data to ensure correct input.

- **src/index.ts**  
  Entry point for the Express application; sets up the server and routes.

- **tests/integration/AccountController.test.ts**  
  Integration tests for the API endpoints, ensuring they work as expected.

- **tests/unit/AccountService.test.ts**  
  Unit tests for the business logic in AccountService.

- **eslint.config.js**  
  Configuration for ESLint to maintain code quality.

- **jest.config.ts**  
  Configuration for Jest, used for running tests and generating coverage reports.

- **package.json**  
  Lists project dependencies, scripts, and metadata.

- **tsconfig.json**  
  TypeScript compiler configuration.

---

## Getting Started

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Run the server:**
   ```
   npm start
   ```

3. **Run tests:**
   ```
   npm test
   ```

The API will be available at `http://localhost:3000` (or the port specified in your configuration).

---

## Notes

- All account data is stored in memory and will be lost when the server restarts.
- This project is intended for demonstration and assessment purposes only.