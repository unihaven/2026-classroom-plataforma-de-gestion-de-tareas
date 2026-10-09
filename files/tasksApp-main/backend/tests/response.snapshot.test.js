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

describe("API Response Structure", () => {
  let user, token, project, task;

  beforeEach(async () => {
    await cleanDatabase();
    user = await createTestUser();
    token = generateTestToken(user);
    project = await createTestProject(user.id);
    task = await createTestTask(project.id);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Simple test to verify response structure without using snapshots
  it("should return proper response structure", async () => {
    const response = await request(app)
      .get(`/api/v1/project/${project.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("project");
  });
});

// Adding this section to update the snapshots
describe("API Response Snapshots", () => {
  let user, token, project, task;

  beforeEach(async () => {
    await cleanDatabase();
    user = await createTestUser();
    token = generateTestToken(user);
    project = await createTestProject(user.id);
    task = await createTestTask(project.id);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Error Response Structure", () => {
    it("should match error response snapshot", async () => {
      const response = await request(app)
        .get("/api/v1/project/999999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });

    it("should match validation error response snapshot", async () => {
      const response = await request(app)
        .post("/api/v1/task")
        .set("Authorization", `Bearer ${token}`)
        .send({ invalid: true });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("errors");
    });
  });

  describe("Project API Responses", () => {
    it("should match project details response snapshot", async () => {
      const response = await request(app)
        .get(`/api/v1/project/${project.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.body).toEqual({
        success: true,
        message: expect.any(String),
        project: expect.objectContaining({
          id: project.id,
          name: project.name,
        }),
      });
    });
  });

  describe("Task API Responses", () => {
    it("should match task details response snapshot", async () => {
      const response = await request(app)
        .get(`/api/v1/task/${task.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.body).toEqual({
        success: true,
        message: expect.any(String),
        task: expect.objectContaining({
          id: task.id,
          name: task.name,
        }),
      });
    });
  });
});
