// filepath: c:\Users\iontc\Proyectos\tasks app\backend\tests\models.test.js
import { jest, describe, it, expect, beforeEach, afterAll } from "@jest/globals";
import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import sequelize from "../database/connection.js";
import { cleanDatabase } from "./helpers.js";

// This is a simplified test file that just tests basic model creation
describe("Model Validations", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  it("should create a user with valid data", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword123",
    };

    const user = await User.create(userData);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  it("should create a project with valid data", async () => {
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword123",
    });

    const projectData = {
      name: "Test Project",
      description: "This is a test project",
      userId: user.id,
    };

    const project = await Project.create(projectData);

    expect(project).toBeDefined();
    expect(project.id).toBeDefined();
    expect(project.name).toBe(projectData.name);
  });

  it("should create a task with valid data", async () => {
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword123",
    });

    const project = await Project.create({
      name: "Test Project",
      description: "This is a test project",
      userId: user.id,
    });

    const taskData = {
      name: "Test Task",
      projectId: project.id,
    };

    const task = await Task.create(taskData);

    expect(task).toBeDefined();
    expect(task.id).toBeDefined();
    expect(task.name).toBe(taskData.name);
    expect(task.done).toBe(false);
  });
});
