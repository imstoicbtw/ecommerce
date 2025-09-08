import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type UserDetails = {
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
    avatar: string | undefined;
    role: string;
    isActive: boolean;
    _id: string;
};

const localUser = localStorage.getItem("user");
const initialState: { details: UserDetails | null } = localUser ? JSON.parse(localUser) : { details: null };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser (state, action: PayloadAction<UserDetails>) {
            state.details = action.payload;
            localStorage.setItem("user", JSON.stringify(state));
        },
        clearUser (state) {
            state.details = null;
            localStorage.removeItem("user");
        },
    },
});

export const {  setUser, clearUser } = userSlice.actions;