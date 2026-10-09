import { createSlice } from "@reduxjs/toolkit";
import { logUser, registerUser } from "./user.async.thunks";

// Define the initial state for the mock
export const initialState = {
  id: 0,
  name: "",
  email: "",
  token: "",
  loading: false,
};

// Create a slice just for testing
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      return payload;
    },
    resetUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Log user
      .addCase(logUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logUser.fulfilled, (state, { payload }) => {
        return { ...payload, loading: false };
      })
      .addCase(logUser.rejected, () => {
        return initialState;
      })
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        return { ...payload, loading: false };
      })
      .addCase(registerUser.rejected, () => {
        return initialState;
      });
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
