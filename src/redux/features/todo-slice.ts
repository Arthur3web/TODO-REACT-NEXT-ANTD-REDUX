import { createSlice } from '@reduxjs/toolkit';

type Todo = {
  id: string;
  name: string;
  timestart: Date;
  timeend: Date;
  done: boolean;
};

type TodoState = {
  list: Todo[];
};

const initialState: TodoState = {
  list: [],
};

export const todo = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      console.log(state);
      console.log(action);
      
      const todo = state.list.push({
        id: new Date().toISOString(),
        name: action.payload,
        timestart: new Date(),
        timeend: action.payload,
        done: false,
      });
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todo.actions;
export default todo.reducer;
