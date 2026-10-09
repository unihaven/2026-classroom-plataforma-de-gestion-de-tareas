import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: 0,
  name: "",
  priority: 0,
  description: "",
};

export const selectedProject = createSlice({
  name: "selectedProject",
  initialState,
  reducers: {
    setSelectedProject: (state, { payload }) => {
      return payload;
    },
    resetSelectedProject: () => {
      return initialState;
    },
  },
});

export const { setSelectedProject, resetSelectedProject } =
  selectedProject.actions;
export default selectedProject.reducer;
