import { createSlice } from "@reduxjs/toolkit";


const initialState = { adminSidebar: false };

export const settingsSlice = createSlice({
    name: "settings",
    reducerPath: "settings",
    initialState,
    reducers: {
        openSidebar: (state) => {
            window.document.body.style.overflow = "hidden";
            state.adminSidebar = true;
        },
        closeSidebar: (state) => {
            window.document.body.style.overflow = "auto";
            state.adminSidebar = false;
        },
    },
});