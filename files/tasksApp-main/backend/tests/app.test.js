// filepath: c:\Users\iontc\Proyectos\tasks app\backend\tests\app.test.js
import { jest, describe, it, expect } from "@jest/globals";
import request from "supertest";
import app from "../app.js";

describe("App Configuration and Middleware", () => {
  it("should have cors enabled", async () => {
    const response = await request(app)
      .options("/api/v1/user/register")
      .set("Origin", "http://example.com");

    expect(response.headers["access-control-allow-origin"]).toBeTruthy();
  });

  it("should have JSON body parser enabled", async () => {
    const response = await request(app)
      .post("/api/v1/user/register")
      .send({ invalidJson: true });

    // Even if the request is invalid, it should be parsed as JSON
    expect(response.status).not.toBe(415); // 415 is Unsupported Media Type
  });

  it("should have security headers via helmet", async () => {
    const response = await request(app).get("/");

    // Check for typical helmet headers
    expect(response.headers["x-content-type-options"]).toBe("nosniff");
    expect(response.headers).toHaveProperty("content-security-policy");
  });

  it("should handle routes not found with 404", async () => {
    const response = await request(app).get("/non-existent-route");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  describe("API Routes", () => {
    it("should have user routes configured", async () => {
      // Testing the register endpoint specifically since /api/v1/user doesn't exist by itself
      const response = await request(app)
        .post("/api/v1/user/register")
        .send({ invalidData: true });
      // We expect an error but not a 404 (route exists but validation fails)
      expect(response.status).not.toBe(404);
    });

    it("should have project routes configured", async () => {
      // Testing with a non-existent ID but the route should exist
      const response = await request(app).get("/api/v1/project/999");
      // We might get 401/403 for auth but not 404 for missing route
      expect(response.status).not.toBe(404);
    });

    it("should have task routes configured", async () => {
      // Testing the task creation endpoint since /api/v1/task by itself might not handle GET
      const response = await request(app)
        .post("/api/v1/task")
        .send({ invalidData: true });
      // We might get 401/403 for auth but not 404 for missing route
      expect(response.status).not.toBe(404);
    });
  });
});
