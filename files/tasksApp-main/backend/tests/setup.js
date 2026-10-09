import { jest, beforeAll, afterAll, afterEach } from "@jest/globals";
import sequelize from "../database/connection.js";

// Import models to ensure they are initialized
import "../models/user.model.js";
import "../models/project.model.js";
import "../models/task.model.js";

// Import models to ensure they are initialized
import "../models/user.model.js";
import "../models/project.model.js";
import "../models/task.model.js";

// Mock environment variables
process.env.JWT_SECRET_KEY = "test-secret-key";
process.env.NODE_ENV = "test";

// Mock bcrypt to avoid native module dependency
jest.mock("bcrypt", () => ({
  hash: jest.fn().mockImplementation((password) => `hashed_${password}`),
  compare: jest.fn().mockImplementation((password, hash) => {
    return Promise.resolve(hash === `hashed_${password}`);
  }),
}));

// Setup and teardown functions for database
beforeAll(async () => {
  try {
    // Sync database with force true to clear data between test runs
    await sequelize.sync({ force: true });
    console.log("Database synced successfully for tests");
  } catch (error) {
    console.error("Failed to sync database for tests:", error);
    throw error; // Fail tests if database cannot be initialized
  }
});

// Clean database between tests using raw queries to avoid model issues
afterEach(async () => {
  // Import the cleanDatabase function we've already improved
  const { cleanDatabase } = await import("./helpers.js");
  await cleanDatabase();
});

afterAll(async () => {
  // Close database connection
  await sequelize.close();
});

// Global test timeout
jest.setTimeout(10000);
