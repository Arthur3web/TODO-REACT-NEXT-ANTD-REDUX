import { RootState } from "@/redux/store";
import { AsyncThunk } from "@reduxjs/toolkit";

export type TodoType = {
    id: number | null;
    title: string;
    completed: boolean;
    userId?: number;
};


export type UserType = {
    // id: number;
    email: string;
    phone: string;
    username: string;
    password: string;
};

export type Status = "idle" | "loading" | "succeeded" | "failed";

export type AddTaskAsyncThunk = AsyncThunk<any, { title: string }, { state: RootState }>