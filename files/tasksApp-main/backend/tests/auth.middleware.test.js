import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { createTestUser, generateTestToken } from "./helpers.js";
import jwt from "jsonwebtoken";
import check from "../middlewares/auth.js";

// Mock req, res objects
const mockRequest = (token = "") => ({
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Auth Middleware", () => {
  describe("auth function", () => {
    it("should add user to request object if token is valid", async () => {
      // Create a test user and generate token
      const user = await createTestUser();
      const token = generateTestToken(user);

      // Create mock request and response
      const req = mockRequest(token);
      const res = mockResponse();
      const next = jest.fn();

      // Call the auth middleware
      await check.auth(req, res, next);

      // Assert that user was added to req and next was called
      expect(req.user).toBeDefined();
      expect(req.user.id).toBe(user.id);
      expect(req.user.name).toBe(user.name);
      expect(req.user.email).toBe(user.email);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
    it("should return 403 if no token is provided", async () => {
      // Create mock request without token
      const req = mockRequest("");
      const res = mockResponse();
      const next = jest.fn();

      // Call the auth middleware
      await check.auth(req, res, next);

      // Assert that 403 was returned
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Authorization header required",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 if token is invalid", async () => {
      // Create mock request with invalid token
      const req = mockRequest("invalid.token.here");
      const res = mockResponse();
      const next = jest.fn();

      // Mock jwt.verify to throw error
      jest.spyOn(jwt, "verify").mockImplementation(() => {
        throw new Error("Invalid token");
      });

      // Call the auth middleware
      await check.auth(req, res, next);

      // Assert that 401 was returned - session expired matches our implementation
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Session has expired",
      });
      expect(next).not.toHaveBeenCalled();

      // Restore original implementation
      jwt.verify.mockRestore();
    });
    it("should return 403 if token format is incorrect", async () => {
      // Create mock request with incorrectly formatted token
      const req = {
        headers: {
          authorization: "InvalidFormat token123",
        },
      };
      const res = mockResponse();
      const next = jest.fn();

      // Call the auth middleware
      await check.auth(req, res, next);

      // Assert that 403 was returned
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Authorization header required",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
