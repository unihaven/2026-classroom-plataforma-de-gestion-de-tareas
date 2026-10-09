import { describe, it, expect, vi, beforeEach } from "vitest";

// Simple test that should always pass
describe("Basic Tests", () => {
  it("true should be true", () => {
    expect(true).toBe(true);
  });

  it("false should be false", () => {
    expect(false).toBe(false);
  });
});

// Simple test for localStorage mock
describe("LocalStorage", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(() => null),
        removeItem: vi.fn(() => null),
      },
      writable: true,
    });
  });

  it("should be able to mock localStorage methods", () => {
    window.localStorage.setItem("test", "value");
    expect(window.localStorage.setItem).toHaveBeenCalledWith("test", "value");

    window.localStorage.getItem("test");
    expect(window.localStorage.getItem).toHaveBeenCalledWith("test");

    window.localStorage.removeItem("test");
    expect(window.localStorage.removeItem).toHaveBeenCalledWith("test");
  });
});
