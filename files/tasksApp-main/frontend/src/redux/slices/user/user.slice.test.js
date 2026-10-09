import { describe, it, expect } from "vitest";
import { mockUser } from "../../../test/mocks";
import userReducer, {
  setUser,
  resetUser,
  initialState,
} from "./user.slice.mock";
import { logUser, registerUser } from "./user.async.thunks";

describe("userSlice", () => {
  // Initial state
  const initialState = {
    id: 0,
    name: "",
    email: "",
    token: "",
    loading: false,
  };

  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setUser", () => {
    const userData = mockUser;
    const actual = userReducer(initialState, setUser(userData));
    expect(actual).toEqual(userData);
  });

  it("should handle resetUser", () => {
    const state = { ...mockUser, loading: false };
    const actual = userReducer(state, resetUser());
    expect(actual).toEqual(initialState);
  });

  // Extra reducers tests
  it("should set loading to true when logUser is pending", () => {
    const action = { type: logUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it("should handle logUser.fulfilled", () => {
    const action = { type: logUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...mockUser, loading: false });
  });

  it("should reset state on logUser.rejected", () => {
    const currentState = { ...mockUser, loading: true };
    const action = { type: logUser.rejected.type };
    const state = userReducer(currentState, action);
    expect(state).toEqual(initialState);
  });

  // Register user tests
  it("should set loading to true when registerUser is pending", () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it("should handle registerUser.fulfilled", () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...mockUser, loading: false });
  });

  it("should reset state on registerUser.rejected", () => {
    const currentState = { ...mockUser, loading: true };
    const action = { type: registerUser.rejected.type };
    const state = userReducer(currentState, action);
    expect(state).toEqual(initialState);
  });
});
