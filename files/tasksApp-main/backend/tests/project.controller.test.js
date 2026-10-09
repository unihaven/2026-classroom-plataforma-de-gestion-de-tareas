// filepath: c:\Users\iontc\Proyectos\tasks app\backend\tests\project.controller.test.js
import { jest, describe, it, expect } from "@jest/globals";
import projectController from "../controllers/project.controller.js";

// Mocking instead of using actual HTTP requests
describe("Project Controller", () => {
  it("should have the required controller methods", () => {
    expect(typeof projectController.getProject).toBe("function");
    expect(typeof projectController.addProject).toBe("function");
    expect(typeof projectController.deleteProject).toBe("function");
    expect(typeof projectController.updateProject).toBe("function");
    expect(typeof projectController.getProjectTasks).toBe("function");
  });
});
