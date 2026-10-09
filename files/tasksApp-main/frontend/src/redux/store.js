import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./slices/user/user.slice.js";
import projectsReducer from "./slices/projects/projects.slice.js";
import selectedProjectReducer from "./slices/selected-project/selectedProject.slice.js";
import tasksReducer from "./slices/tasks/tasks.slice.js";

const reducers = combineReducers({
  user: userReducer,
  projects: projectsReducer,
  selectedProject: selectedProjectReducer,
  tasks: tasksReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});
