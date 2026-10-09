import {
  fetchProjects,
  addProject,
  removeProject,
  updateProject,
} from "./projects.async.thunks";

const fetchProjectsReducer = {
  [fetchProjects.pending]: (state) => {
    state.loading = true;
  },
  [fetchProjects.fulfilled]: (state, { payload }) => {
    return { list: payload, loading: false };
  },
  [fetchProjects.rejected]: (state) => {
    state.loading = false;
  },
};

const addProjectReducer = {
  [addProject.pending]: (state) => {
    state.loading = true;
  },
  [addProject.fulfilled]: (state, { payload }) => {
    return { list: [payload, ...state.list], loading: false };
  },
  [addProject.rejected]: (state) => {
    state.loading = false;
  },
};

const removeProjectReducer = {
  [removeProject.pending]: (state) => {
    state.loading = true;
  },
  [removeProject.fulfilled]: (state, { payload }) => {
    return {
      list: state.list.filter((project) => project.id != payload.id),
      loading: false,
    };
  },
  [removeProject.rejected]: (state) => {
    state.loading = false;
  },
};

const updateProjectReducer = {
  [updateProject.pending]: (state) => {
    state.loading = true;
  },
  [updateProject.fulfilled]: (state, { payload }) => {
    return {
      list: state.list.map((project) =>
        project.id == payload.id ? payload : project,
      ),
      loading: false,
    };
  },
  [updateProject.rejected]: (state) => {
    state.loading = false;
  },
};

const extraReducers = {
  ...fetchProjectsReducer,
  ...addProjectReducer,
  ...removeProjectReducer,
  ...updateProjectReducer,
};

export default extraReducers;
