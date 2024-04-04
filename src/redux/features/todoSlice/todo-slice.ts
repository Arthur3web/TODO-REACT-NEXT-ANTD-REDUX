import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { addTasks, deleteTask, fetchTasks, toggleStatusTask } from "./actions";
import { Status, TodoType } from "../types vs interfaces/types";

interface TodoState {
  taskList: TodoType[];
  status: Status;
  error: string | null;
}

const initialState: TodoState = {
  taskList: [],
  status: "idle",
  error: null,
};

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    //редукторы для управления состоянием списка задач.

    resetTodo: (state) => {
      // state = initialState;
      state.taskList = initialState.taskList;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers(builder) {
    //дополнительные редукторы для обработки асинхронных событий, таких как начало загрузки, успешное завершение загрузки и ошибки загрузки.
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taskList = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch tasks";
        message.error(state.error);
      })
      // .addCase(addTasks.pending, (state: { status: string }) => {
      //   state.status = "loading";
      // })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taskList.push(action.payload);
      })
      .addCase(addTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to add tasks";
        message.error(state.error);
      })
      // .addCase(deleteTask.pending, (state: { status: string }) => {
      //   state.status = "loading";
      // })
      .addCase(deleteTask.fulfilled, (state, action: any) => {
        state.status = "succeeded";
        state.taskList = state.taskList.filter(
          (task) => task.id !== action.payload
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to add tasks";
        message.error(state.error);
      })
      .addCase(
        toggleStatusTask.fulfilled,
        (state, action) => {
          const taskId = action.payload;
          const todo = state.taskList.find((todo) => todo.id === taskId);
          if (todo) {
            todo.completed = !todo.completed;
          }
        }
      )
      .addCase(
        toggleStatusTask.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "Failed to toggle status tasks";
          message.error(state.error);
        }
      );
  },
});

export const { resetTodo } = todo.actions;
export default todo.reducer;