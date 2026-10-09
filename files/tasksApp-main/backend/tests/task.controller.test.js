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

describe("Task Controller", () => {
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

  // Simplified test that only checks that the API endpoints work
  it("should have working task endpoints", async () => {
    // This is a simplified test that just verifies the routes respond
    const getResponse = await request(app)
      .get(`/api/v1/task/${task.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getResponse.status).toBe(200);

    const createResponse = await request(app)
      .post("/api/v1/task")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "New Test Task", projectId: project.id });

    expect(createResponse.status).toBe(200);

    const updateResponse = await request(app)
      .put(`/api/v1/task/${task.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ done: true });

    expect(updateResponse.status).toBe(200);

    const deleteResponse = await request(app)
      .delete(`/api/v1/task/${task.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.status).toBe(200);
  });
});
