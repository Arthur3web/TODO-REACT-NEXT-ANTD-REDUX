import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

type UserType = {
  id: string;
  email: string;
  phone: string;
  username: string;
};

type UserState = {
  userList: UserType[];
  loggedInUser: UserType | null,
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: UserState = {
  userList: [],
  loggedInUser: null,
  error: null,
  status: "idle",
};

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string, password: string }) => {
    const response = await axios.get<UserType[]>(`https://jsonplaceholder.typicode.com/users?email=${email}`);
    const users = response.data;
    if (users.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = users[0];
    if (user.email === email && user.phone === password) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      return user;
    } else {
      throw new Error('Неправильное имя пользователя или пароль');
    }
  }
);

export const users = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedInUser = action.payload;
    },
    logout: (state) => {
      state.loggedInUser = null;
    },
    createUser: (state, action: PayloadAction<UserType>) => {
      state.userList.push(action.payload);
      console.log(state);
      console.log(action);
    },
  },
  // reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedInUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        // state.error = action.error.message;
      })
  },
});

export const { login, logout, createUser } = users.actions;
export default users.reducer;
