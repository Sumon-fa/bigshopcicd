import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    user: {},
    isAuthenticated: false,
    isLoading: null,
  },
  reducers: {
    authentication(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    loader(state) {
      state.isLoading = !state.isLoading;
    },
    userRegister(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    loadUser(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    logout(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
