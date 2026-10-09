import jwt from "jsonwebtoken";
import { expect } from "@jest/globals";
import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import sequelize from "../database/connection.js";

// Mock bcrypt for testing purposes
const mockBcrypt = {
  hash: (password) => `hashed_${password}`,
  compare: (password, hash) => hash === `hashed_${password}`,
};

// Create a test user with mocked hashed password
export const createTestUser = async (userData = {}) => {
  const defaultUser = {
    name: "Test User",
    email: "test@example.com",
    password: mockBcrypt.hash("password123"),
  };

  return await User.create({ ...defaultUser, ...userData });
};

// Generate a JWT token for testing authentication
export const generateTestToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "10d" });
};

// Create a test project
export const createTestProject = async (userId, projectData = {}) => {
  const defaultProject = {
    name: "Test Project",
    description: "This is a test project",
    userId,
  };

  return await Project.create({ ...defaultProject, ...projectData });
};

// Create a test task
export const createTestTask = async (projectId, taskData = {}) => {
  const defaultTask = {
    name: "Test Task",
    done: false,
    projectId,
  };

  return await Task.create({ ...defaultTask, ...taskData });
};

// Clean up database between tests
export const cleanDatabase = async () => {
  try {
    const dialect = sequelize.options.dialect;

    // Temporarily disable foreign key constraints
    if (dialect === "postgres") {
      await sequelize.query("SET CONSTRAINTS ALL DEFERRED");
    } else if (dialect === "sqlite") {
      await sequelize.query("PRAGMA foreign_keys = OFF");
    }

    // Use raw SQL for more reliable cleanup
    const tables = ["Tasks", "Projects", "Users"];

    for (const table of tables) {
      // Use proper quotes for table names
      const quotedTable =
        dialect === "postgres" ? `"${table}"` : `\`${table}\``;
      await sequelize.query(`DELETE FROM ${quotedTable}`);

      // Reset auto-increment/sequences if needed
      if (dialect === "postgres") {
        try {
          await sequelize.query(
            `ALTER SEQUENCE "${table}_id_seq" RESTART WITH 1`,
          );
        } catch (err) {
          // Ignore errors if sequence doesn't exist
        }
      } else if (dialect === "sqlite") {
        try {
          await sequelize.query(
            `DELETE FROM sqlite_sequence WHERE name='${table}'`,
          );
        } catch (err) {
          // Ignore errors if table doesn't exist
        }
      }
    }

    // Re-enable foreign key constraints
    if (dialect === "postgres") {
      await sequelize.query("SET CONSTRAINTS ALL IMMEDIATE");
    } else if (dialect === "sqlite") {
      await sequelize.query("PRAGMA foreign_keys = ON");
    }
  } catch (error) {
    console.error("Database cleanup error:", error);
    throw error; // Re-throw to fail tests when cleanup fails
  }
};

// Create multiple test tasks for a project
export const createMultipleTasks = async (projectId, count = 3) => {
  const tasks = [];
  for (let i = 1; i <= count; i++) {
    tasks.push(await createTestTask(projectId, { name: `Test Task ${i}` }));
  }
  return tasks;
};

// Create multiple test projects for a user
export const createMultipleProjects = async (userId, count = 3) => {
  const projects = [];
  for (let i = 1; i <= count; i++) {
    projects.push(
      await createTestProject(userId, { name: `Test Project ${i}` }),
    );
  }
  return projects;
};

// Helper to verify task properties
export const expectTaskProperties = (task) => {
  expect(task).toHaveProperty("id");
  expect(task).toHaveProperty("name");
  expect(task).toHaveProperty("done");
  expect(task).toHaveProperty("projectId");
  expect(task).toHaveProperty("createdAt");
  expect(task).toHaveProperty("updatedAt");
};

// Helper to verify project properties
export const expectProjectProperties = (project) => {
  expect(project).toHaveProperty("id");
  expect(project).toHaveProperty("name");
  expect(project).toHaveProperty("description");
  expect(project).toHaveProperty("userId");
  expect(project).toHaveProperty("createdAt");
  expect(project).toHaveProperty("updatedAt");
};
