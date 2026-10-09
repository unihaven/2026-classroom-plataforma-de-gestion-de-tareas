import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProjects } from "@/api/user.routes";
import {
  createProject,
  deleteProject,
  modifyProject,
} from "@/api/project.routes";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (userData, { rejectWithValue }) => {
    try {
      const { projects } = await fetchUserProjects(userData);
      return projects;
    } catch {
      rejectWithValue("A problem occurred while fetching user projects");
    }
  },
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const { project } = await createProject(data.user, data.project);
      return project;
    } catch {
      rejectWithValue("A problem occurred while adding project");
    }
  },
);

export const removeProject = createAsyncThunk(
  "projects/removeProject",
  async (data, { rejectWithValue }) => {
    try {
      await deleteProject(data.user, data.project.id);
      return data.project;
    } catch {
      rejectWithValue("A problem occurred while adding project");
    }
  },
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (data, { rejectWithValue }) => {
    try {
      await modifyProject(data.user, data.project);
      return data.project;
    } catch {
      rejectWithValue("A problem occurred while adding project");
    }
  },
);
