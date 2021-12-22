import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isUpdated: false,
    message: null,
    success: false,
    users: [],
    isUpdate: false,
    isDeleted: false,
    user: {},
  },
  reducers: {
    updateProfile(state, action) {
      state.isUpdated = action.payload.isUpdated;
    },
    loader(state) {
      state.isLoading = !state.isLoading;
    },
    forgot(state, action) {
      state.message = action.payload.message;
    },
    newPassword(state, action) {
      state.success = action.payload.success;
    },
    allUsers(state, action) {
      state.users = action.payload.users;
    },
    userUpdate(state, action) {
      state.isUpdate = action.payload.isUpdate;
    },
    removeUser(state, action) {
      state.isDeleted = action.payload.isDeleted;
    },
    details(state, action) {
      state.user = action.payload.user;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
