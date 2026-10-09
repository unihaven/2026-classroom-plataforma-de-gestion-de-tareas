// filepath: c:\Users\iontc\Proyectos\tasks app\backend\tests\task.routes.test.js
import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import "../models/user.model.js";
import "../models/project.model.js";
import "../models/task.model.js";
import {
  createTestUser,
  generateTestToken,
  createTestProject,
  createTestTask,
  cleanDatabase,
} from "./helpers.js";

// Mock the validation middleware for clean testing
jest.mock("../middlewares/validators/task.validators.js", () => ({
  validateTaskCreate: () => (req, res, next) => next(),
  validateTaskId: () => (req, res, next) => next(),
  validateTaskUpdate: () => (req, res, next) => next(),
}));

// Mock the matchedData function
jest.mock("express-validator", () => ({
  matchedData: jest.fn((req, options) => {
    if (options && options.locations) {
      if (options.locations.includes("params")) {
        return { id: req.params.id };
      } else if (options.locations.includes("body")) {
        return req.body;
      }
    }
    return req.body;
  }),
}));

describe("Task Routes", () => {
  let user, token, project, task;

  // Set up test data before each test
  beforeEach(async () => {
    await cleanDatabase();
    user = await createTestUser();
    token = generateTestToken(user);
    project = await createTestProject(user.id);
    task = await createTestTask(project.id);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  // Simplified auth test to check that the routes require authentication
  it("should require authentication for task routes", async () => {
    const response = await request(app).get(`/api/v1/task/${task.id}`);
    expect(response.status).toBe(403);
  });

  // Simplified test to check that authenticated users can access tasks
  it("should allow access to authorized users", async () => {
    const response = await request(app)
      .get(`/api/v1/task/${task.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
