import { RootState } from "@/redux/store";
import { AsyncThunk } from "@reduxjs/toolkit";

export type TodoType = {
    id: string;
    title: string;
    completed: boolean;
};

export type UserType = {
    id: string;
    email: string;
    phone: string;
    username: string;
    password: string;
};

export type Status = "idle" | "loading" | "succeeded" | "failed";

export type AddTaskAsyncThunk = AsyncThunk<any, { title: string }, { state: RootState }>