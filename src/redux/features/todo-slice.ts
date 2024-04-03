import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

type TodoType = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoState = {
  taskList: TodoType[];
  // loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export const fetchPosts = createAsyncThunk(
  //выполняет асинхронный запрос к API для получения списка постов.
  "todo/fetchPosts",
  async () => {
    try {
      const loggedInUsers = localStorage.getItem("loggedInUser");
      if (!loggedInUsers) {
        return;
      }
      const loggedInUser = JSON.parse(loggedInUsers);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${loggedInUser.id}`
      );
      if (!response.ok) {
        throw new Error("Невозможно получить список задач пользователя");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to initialize user data");
    }
  }
);

const initialState: TodoState = {
  taskList: [],
  status: "idle",
  // loading: false,
  error: null,
};

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    //редукторы для управления состоянием списка задач.
    addTodo: (state, action) => {
      state.taskList.push(action.payload);
      // console.log(state);
      // console.log(action);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    toggleStatusTodo: (state, action: PayloadAction<string>) => {
      const todo = state.taskList.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string; newData: Partial<TodoType> }>
    ) => {
      const { id, newData } = action.payload;
      const todoIndex = state.taskList.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.taskList[todoIndex] = {
          ...state.taskList[todoIndex],
          ...newData,
        };
      }
    },
    fetchTodo: (state, action: PayloadAction<TodoType[]>) => {
      state.taskList = action.payload;
    },
  },
  extraReducers(builder) {
    //дополнительные редукторы для обработки асинхронных событий, таких как начало загрузки, успешное завершение загрузки и ошибки загрузки.
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taskList = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch tasks";
        message.error(state.error);
      });
  },
});

export const { addTodo, removeTodo, toggleStatusTodo, editTodo, fetchTodo } =
  todo.actions;
export default todo.reducer;
