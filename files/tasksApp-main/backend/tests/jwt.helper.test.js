import { jest } from "@jest/globals";
import * as jwtHelper from "../helpers/jwt.js";
import jwt from "jsonwebtoken";

describe("JWT Helper", () => {
  // Original JWT_SECRET_KEY
  const originalEnv = process.env.JWT_SECRET_KEY;

  beforeAll(() => {
    // Set JWT secret for testing
    process.env.JWT_SECRET_KEY = "test-secret-key";
  });

  afterAll(() => {
    // Restore original value
    process.env.JWT_SECRET_KEY = originalEnv;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("generateToken function", () => {
    it("should generate a valid JWT token with user payload", () => {
      // Mock jwt.sign
      const mockSign = jest.spyOn(jwt, "sign");
      mockSign.mockReturnValue("mock.jwt.token");

      const user = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
      };

      const token = jwtHelper.generateToken(user);

      expect(token).toBe("mock.jwt.token");
      expect(mockSign).toHaveBeenCalledWith(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: expect.any(String) },
      );

      // Restore original implementation
      mockSign.mockRestore();
    });

    it("should throw an error if user data is missing", () => {
      expect(() => jwtHelper.generateToken(null)).toThrow();
      expect(() => jwtHelper.generateToken(undefined)).toThrow();
      expect(() => jwtHelper.generateToken({})).toThrow();
    });
  });

  describe("verifyToken function", () => {
    it("should verify and decode a valid token", () => {
      // User data
      const user = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
      };

      // Generate a real token
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

      // Verify the token
      const decoded = jwtHelper.verifyToken(token);

      expect(decoded).toMatchObject(user);
    });

    it("should throw an error for an invalid token", () => {
      expect(() => jwtHelper.verifyToken("invalid.token")).toThrow();
    });

    it("should throw an error for an expired token", () => {
      // Generate an expired token
      const user = { id: 1, name: "Test User" };
      const expiredToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: "0s",
      });

      // Wait for token to expire
      setTimeout(() => {
        expect(() => jwtHelper.verifyToken(expiredToken)).toThrow();
      }, 1000);
    });
  });
});
