import { describe, it, expect, vi, beforeEach } from "vitest";
import { logUser, registerUser } from "./user.async.thunks";
import * as userApi from "../../../api/user.routes";
import { mockUser } from "../../../test/mocks";

// Mock the user API
vi.mock("../../../api/user.routes", () => ({
  logIn: vi.fn(),
  register: vi.fn(),
}));

describe("User Async Thunks", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe("logUser", () => {
    it("should call logIn and save the user to localStorage on success", async () => {
      // Setup
      const credentials = {
        email: "test@example.com",
        password: "Test123!",
      };

      userApi.logIn.mockResolvedValue({ user: mockUser });

      // Execute
      await logUser(credentials)(dispatch, getState);

      // Verify
      expect(userApi.logIn).toHaveBeenCalledWith(credentials);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify(mockUser),
      );
    });
  });

  describe("registerUser", () => {
    it("should call register and save the user to localStorage on success", async () => {
      // Setup
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "Test123!",
      };

      userApi.register.mockResolvedValue({ user: mockUser });

      // Execute
      await registerUser(userData)(dispatch, getState);

      // Verify
      expect(userApi.register).toHaveBeenCalledWith(userData);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify(mockUser),
      );
    });
  });
});
