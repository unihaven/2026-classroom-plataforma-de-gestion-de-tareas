import { createSlice } from "@reduxjs/toolkit";
import extraReducers from "./user.extra.reducers";

export const initialState = {
  id: 0,
  name: "",
  email: "",
  token: "",
  loading: false,
};

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
  extraReducers: extraReducers,
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
