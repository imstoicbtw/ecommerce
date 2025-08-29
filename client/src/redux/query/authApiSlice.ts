import { AUTH_URL } from "../../../../common/dist/index.js";
import type { loginUserReqBodyType, registerUserReqBodyType } from "../../../../common/dist/zod/requests/auth.zod.js";
import { apiSlice } from "./baseQuery.ts";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (body: loginUserReqBodyType) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body,
            }),
        }),
        register: builder.mutation({
            query: (body: registerUserReqBodyType) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                body,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: "POST",
            }),
        }),
    }),
});

export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = authApiSlice;