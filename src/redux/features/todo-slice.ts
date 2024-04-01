import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

type TodoType = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoState = {
  taskList: TodoType[];
};

const initialState: TodoState = {
  taskList: [],
};

export const todo = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.taskList.push(action.payload);
      console.log(state);
      console.log(action);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter((todo) => todo.id !== action.payload);
    },
    toggleStatusTodo: (state, action: PayloadAction<string>) => {
      const todo = state.taskList.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string, newData: Partial<TodoType> }>) => {
      const { id, newData } = action.payload;
      const todoIndex = state.taskList.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state.taskList[todoIndex] = { ...state.taskList[todoIndex], ...newData };
      }
    },
    fetchTodo: (state, action: PayloadAction<TodoType[]>) => {
      state.taskList = action.payload;
    },
    
  },
});

export const { addTodo, removeTodo, toggleStatusTodo, editTodo, fetchTodo } = todo.actions;
export default todo.reducer;
