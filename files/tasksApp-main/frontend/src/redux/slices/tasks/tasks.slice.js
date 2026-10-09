import { createSlice } from "@reduxjs/toolkit";
import extraReducers from "./tasks.extra.reducers";

export const initialState = {
  list: [],
  loading: false,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetTasks: () => {
      return initialState;
    },
  },
  extraReducers: extraReducers,
});

export const { setTasks, resetTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
