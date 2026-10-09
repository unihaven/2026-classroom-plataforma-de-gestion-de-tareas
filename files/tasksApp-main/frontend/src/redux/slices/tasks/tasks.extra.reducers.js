import {
  fetchTasks,
  addTask,
  removeTask,
  updateTask,
} from "./tasks.async.thunks";

const fetchTasksReducer = {
  [fetchTasks.pending]: (state) => {
    state.loading = true;
  },
  [fetchTasks.fulfilled]: (state, { payload }) => {
    return { list: payload, loading: false };
  },
  [fetchTasks.rejected]: (state) => {
    state.loading = false;
  },
};

const addTaskReducer = {
  [addTask.pending]: (state) => {
    state.loading = true;
  },
  [addTask.fulfilled]: (state, { payload }) => {
    return { list: [payload, ...state.list], loading: false };
  },
  [addTask.rejected]: (state) => {
    state.loading = false;
  },
};

const removeTaskReducer = {
  [removeTask.pending]: (state) => {
    state.loading = true;
  },
  [removeTask.fulfilled]: (state, { payload }) => {
    return {
      list: state.list.filter((task) => task.id != payload.id),
      loading: false,
    };
  },
  [removeTask.rejected]: (state) => {
    state.loading = false;
  },
};

const updateTaskReducer = {
  [updateTask.pending]: (state) => {
    state.loading = true;
  },
  [updateTask.fulfilled]: (state, { payload }) => {
    return {
      list: state.list.map((task) => (task.id == payload.id ? payload : task)),
      loading: false,
    };
  },
  [updateTask.rejected]: (state) => {
    state.loading = false;
  },
};

const extraReducers = {
  ...fetchTasksReducer,
  ...addTaskReducer,
  ...removeTaskReducer,
  ...updateTaskReducer,
};

export default extraReducers;
