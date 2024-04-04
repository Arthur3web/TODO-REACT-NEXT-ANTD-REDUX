import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./actions";
import { Status, UserType } from "../types vs interfaces/types";

export interface UserState {
  // userList: UserType[];
  loggedInUser: UserType | null;
  error: string | null;
  status: Status;
};

const initialState: UserState = {
  // userList: [],
  loggedInUser: null,
  error: null,
  status: "idle",
};

export const users = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedInUser = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedInUser = action.payload || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Не удалось выполнить вход";
      });
  },
});

export const { logout } = users.actions;
export default users.reducer;
