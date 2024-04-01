import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

type UserType = {
  id: string;
  email: string;
  password: string;
  username: string;
};

type UserState = {
  userList: UserType[];
  loggedInUser: null,
};

const initialState: UserState = {
  userList: [],
  loggedInUser: null,
};

// const fetchUserById = createAsyncThunk( //сначала создаем thunk
//   'users/fetchByIdStatus',
//   async (userId, thunkAPI) => {
//     const response = await userAPI.fetchById(userId); //должен для начала получить userAPI
//     return response.data;
//   }
// )
//затем необходимо обработать этот thunk в редукторах
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
});

export const { login, logout, createUser } = users.actions;
// export const selectLoggedInUser = (state: { user: { loggedInUser: any } }) =>
//   state.user.loggedInUser;

export default users.reducer;
