import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./query/baseQuery.ts";
import { cartSlice } from "./slices/cartSlice.ts";
import { recentlyViewedSlice } from "./slices/recentlyViewedSlice.ts";
import { userSlice } from "./slices/userSlice.ts";


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [cartSlice.reducerPath]: cartSlice.reducer,
        [recentlyViewedSlice.reducerPath]: recentlyViewedSlice.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;


export type Store = ReturnType<typeof store.getState>;