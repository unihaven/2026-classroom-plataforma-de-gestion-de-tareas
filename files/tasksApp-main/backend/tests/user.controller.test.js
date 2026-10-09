// filepath: c:\Users\iontc\Proyectos\tasks app\backend\tests\user.controller.test.js
import { jest, describe, it, expect } from "@jest/globals";
import userController from "../controllers/user.controller.js";

// Mocking instead of using actual HTTP requests
describe("User Controller", () => {
  it("should have the required controller methods", () => {
    expect(typeof userController.register).toBe("function");
    expect(typeof userController.logIn).toBe("function");
    expect(typeof userController.getUserProjects).toBe("function");
  });
});
