import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasks,
  createTask,
  deleteTask,
  modifyTask,
} from "@/api/task.routes";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ user, project }, { rejectWithValue }) => {
    try {
      const { tasks } = await getTasks(user, project);
      return tasks;
    } catch {
      rejectWithValue("A problem occurred while fetching project tasks");
    }
  },
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ user, task }, { rejectWithValue }) => {
    try {
      const data = await createTask(user, task);
      return data.task;
    } catch {
      rejectWithValue("A problem occurred while fetching project tasks");
    }
  },
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async ({ user, task }, { rejectWithValue }) => {
    try {
      await deleteTask(user, task);
      return task;
    } catch {
      rejectWithValue("A problem occurred while fetching project tasks");
    }
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ user, task }, { rejectWithValue }) => {
    try {
      const data = await modifyTask(user, task);
      return data.task;
    } catch {
      rejectWithValue("A problem occurred while fetching project tasks");
    }
  },
);
