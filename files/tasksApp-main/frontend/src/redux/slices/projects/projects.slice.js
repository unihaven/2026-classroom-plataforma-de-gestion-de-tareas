import { createSlice } from "@reduxjs/toolkit";
import extraReducers from "./projects.extra.reducers";

const initialState = {
  list: [],
  loading: false,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, { payload }) => {
      state.list = payload;
    },
  },
  extraReducers: extraReducers,
});

export const { setProjects, removeProject, addProject, updateProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
