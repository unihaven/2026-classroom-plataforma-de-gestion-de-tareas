import { createAsyncThunk } from "@reduxjs/toolkit";
import { logIn, register } from "@/api/user.routes";

export const logUser = createAsyncThunk(
  "user/setUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { user } = await logIn(credentials);

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch {
      rejectWithValue("A problem occurred while logging in");
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { user } = await register(userData);

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch {
      rejectWithValue("A problem occurred while registering user");
    }
  },
);
