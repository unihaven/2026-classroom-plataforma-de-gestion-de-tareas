# Tasks App Backend - Testing Documentation

This documentation outlines the testing structure and how to run tests for the Tasks App Backend.

## Testing Structure

The testing suite is organized into the following categories:

1. **Unit Tests**: Testing individual components such as controllers, models, and helpers
2. **Integration Tests**: Testing how components work together through API endpoints
3. **Database Tests**: Testing models and their relationships
4. **Validation Tests**: Testing input validation middleware
5. **Application Tests**: Testing the overall application configuration and middleware

### Test Files

- `task.controller.test.js`: Tests for task controller functions
- `project.controller.test.js`: Tests for project controller functions
- `user.controller.test.js`: Tests for user controller functions
- `auth.middleware.test.js`: Tests for authentication middleware
- `error.middleware.test.js`: Tests for error handling middleware
- `jwt.helper.test.js`: Tests for JWT token creation and verification
- `database-test.js`: Basic tests for database models and relationships
- `models.test.js`: Comprehensive tests for model validations and associations
- `task.routes.test.js`: Tests for task API routes
- `validators.test.js`: Tests for input validation middleware
- `app.test.js`: Tests for application configuration and middleware
- `integration.test.js`: End-to-end tests for complete user workflows

## Running Tests

To run the tests, use the following commands:

### Run all tests
```bash
npm test
```

### Run tests in watch mode (for development)
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

### Run only controller tests
```bash
npm run test:controllers
```

### Run only model tests
```bash
npm run test:models
```

### Run only integration tests
```bash
npm run test:integration
```

### Run tests in CI environment
```bash
npm run test:ci
```

## Test Coverage

The tests cover the following aspects of the application:

- User registration and authentication
- Project creation, retrieval, updating, and deletion
- Task creation, retrieval, updating, and deletion
- Access control (ensuring users can only access their own resources)
- Error handling (e.g., not found, unauthorized)
- Input validation
- Database relationships and constraints
- Model validations and associations
- Middleware functionality
- Application configuration

## Mocks

The tests use mocks for the following components:

- `express-validator`: Mocked to simplify request validation during testing
- `bcrypt`: Mocked for password hashing to avoid native module dependencies
- Database: Uses Sequelize with test configurations
- JWT: Mocked for testing authentication

## Adding New Tests

When adding new features to the application, follow these testing principles:

1. Create unit tests for new controllers, models, and helpers
2. Add route tests for new API endpoints
3. Update integration tests if the new feature affects user workflows
4. Ensure proper error handling is tested
5. Verify authorization rules are enforced
6. Add model validations as needed

## Best Practices

- Clean the database before each test to ensure a consistent starting state
- Use helper functions for common operations (e.g., creating test users)
- Test both successful operations and error cases
- Test authorization to ensure users can only access their own resources
- Keep tests independent of each other
- Use descriptive test names that explain what's being tested
- Mock external dependencies to isolate tests
- Organize tests according to features or components

## Troubleshooting Common Issues

### Failing Authentication Tests
- Check that the JWT secret is correctly set in the test environment
- Verify that the auth middleware is being mocked correctly

### Database Connection Issues
- Ensure the test database configuration is separate from the production database
- Verify the connection is closed after tests complete

### Slow Tests
- Check for unnecessary database operations
- Use beforeAll/afterAll for expensive setup operations
- Consider using in-memory databases for testing

## Continuous Integration

The test suite is designed to be run in a CI environment. Use the following command:

```bash
npm run test:ci
```

This will run all tests with coverage reporting and exit with an appropriate status code.
