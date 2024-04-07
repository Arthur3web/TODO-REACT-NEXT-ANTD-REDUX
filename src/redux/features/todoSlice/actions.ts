import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddTaskAsyncThunk } from "../types vs interfaces/types";

export const fetchTasks = createAsyncThunk(
    //выполняет асинхронный запрос к API для получения списка задач.
    "todo/fetchTasks",
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

export const addTasks: AddTaskAsyncThunk = createAsyncThunk(
  "todo/AddTasks",
  async (taskData: { title: string }, { dispatch }) => {
    try {
      const userDataString = localStorage.getItem("loggedInUser");
      if (userDataString === null) {
        throw new Error("User data not found in local storage");
      }
      const userData = JSON.parse(userDataString);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: taskData.title, 
          completed: false,
          userId: userData.id,
        }
      );
      const newTask = response.data;
      return newTask;
    } catch (error) {
      throw error;
    }
  }
)

export const deleteTask = createAsyncThunk(
  "todo/deleteTask",
  async (id) => {
    try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      return id;
    } catch (error) {
      throw new Error("Failed to delete task");
    }
  }
)

export const editTask = createAsyncThunk(
  "todo/editTask",
  async ({ id, title, completed } : {id: number, title: string, completed: boolean}) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {title, completed});
      return response.data;
    } catch (error) {
      console.error("Failed to edit Task:", error);
      throw new Error("Failed to edit Task");
    }
  }
)