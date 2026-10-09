import { logUser, registerUser } from "./user.async.thunks";
import { initialState } from "./user.slice";

const extraReducers = (builder) => {
  builder
    // logUser reducers
    .addCase(logUser.rejected, () => {
      return initialState;
    })
    .addCase(logUser.fulfilled, (state, { payload }) => {
      return { ...payload, loading: false };
    })
    .addCase(logUser.pending, (state) => {
      state.loading = true;
    })
    // registerUser reducers
    .addCase(registerUser.rejected, () => {
      return initialState;
    })
    .addCase(registerUser.fulfilled, (state, { payload }) => {
      return { ...payload, loading: false };
    })
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
};

export default extraReducers;
