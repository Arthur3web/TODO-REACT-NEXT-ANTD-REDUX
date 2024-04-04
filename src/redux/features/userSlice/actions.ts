import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { UserType } from "../types vs interfaces/types";

export const loginUser = createAsyncThunk(
    "user/login",
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await axios.get<UserType[]>(
          `https://jsonplaceholder.typicode.com/users?email=${email}`
        );
        const users = response.data;
        if (users.length === 0) {
          throw new Error("Пользователь не найден");
        }
        const user = users[0];
        if (user.email === email && user.phone === password) {
          message.open({
            type: "success",
            content: "Успешный вход",
          });
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          return user;
        } else {
          throw new Error("Неправильное имя пользователя или пароль");
        }
      } catch (error: any) {
        message.open({
          type: "error",
          content: error.message,
        });
        console.error("Ошибка входа:", error.message);
        throw error;
      }
    }
  );