import { describe, it, expect } from "vitest";

describe("Basic Tests", () => {
  it("true should be true", () => {
    expect(true).toBe(true);
  });

  it("1 + 1 should equal 2", () => {
    expect(1 + 1).toBe(2);
  });

  it("string concatenation works", () => {
    expect("hello " + "world").toBe("hello world");
  });
});
