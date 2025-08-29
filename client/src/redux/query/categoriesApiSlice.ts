import { CATEGORIES_URL } from "../../../../common/dist/index.js";
import type { createCategoryReqBodyType } from "common/dist/zod/requests/category.zod.ts";
import { apiSlice } from "./baseQuery.ts";


export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createCategory: builder.mutation({
            query: (body: createCategoryReqBodyType) => ({
                url: CATEGORIES_URL,
                method: "POST",
                body,
            }),
        }),
        getCategories: builder.query({
            query: () => ({
                url: CATEGORIES_URL,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {useCreateCategoryMutation, useGetCategoriesQuery} = categoriesApiSlice;