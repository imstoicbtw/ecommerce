import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../../../common/dist/constants.js";


const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
    reducerPath: "server",
    baseQuery,
    tagTypes: [ "Category", "Product", "User", "Order", "Media" ],
    endpoints: () => ({}),
});


