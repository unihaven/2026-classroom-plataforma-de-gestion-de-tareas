import { describe, it, expect } from "vitest";

// A pure JS test without React
describe("Pure Test", () => {
  it("true is true", () => {
    expect(true).toBe(true);
  });

  it("string comparison works", () => {
    expect("hello").toBe("hello");
  });

  it("objects can be compared with deep equality", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(obj1).toEqual(obj2);
  });
});
