import { USERS_URL } from "../../../../common/dist/index.js";
import type { addNewAddressReqBodyType, updateAddressReqBodyType, updateCurrentUserDetailsReqBodyType, updatePasswordReqBodyType, updateUserRoleReqBodyType } from "common/dist/zod/requests/user.zod.ts";
import { apiSlice } from "./baseQuery.ts";


type RequestQuery = {
    size?: number;
    page?: number;
    keyword?: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAdminStats: builder.query({
            query: () => `${USERS_URL}/admin`,
        }),
        getCustomers: builder.query({
            query: ({ size, page, keyword }: RequestQuery) => ({
                url: `${USERS_URL}/customers/?size=${size || 8}&page=${page || 1}&keyword=${keyword || ""}`,
            }),
        }),
        getUserById: builder.query({
            query: (userId: string) => ({
                url: `${USERS_URL}/${userId}`,
            }),
        }),
        updateUserRole: builder.mutation({
            query: (body: updateUserRoleReqBodyType & { userId: string }) => ({
                url: `${USERS_URL}/${body.userId}`,
                method: "PATCH",
                body,
            }),
        }),
        updateUserStatus: builder.mutation({
            query: (userId: string) => ({
                url: `${USERS_URL}/user/${userId}/status`,
                method: "PATCH",
            }),
        }),
        deleteUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/current-user`,
                method: "DELETE",
            }),
        }),
        getCurrentUser: builder.query({
            query: () => ({
                url: `${USERS_URL}/current-user`,
            }),
        }),
        updateCurrentUserDetails: builder.mutation({
            query: (body: updateCurrentUserDetailsReqBodyType) => ({
                url: `${USERS_URL}/current-user`,
                method: "PATCH",
                body,
            }),
        }),
        updatePassword: builder.mutation({
            query: (body: updatePasswordReqBodyType & { userId: string }) => ({
                url: `${USERS_URL}/${body.userId}/password`,
            }),
        }),
        getMyAddresses: builder.query({
            query: () => ({
                url: `${USERS_URL}/current-user/addresses`,
            }),
        }),
        addNewAddress: builder.mutation({
            query: (body: addNewAddressReqBodyType) => ({
                url: `${USERS_URL}/current-user/addresses`,
                method: "POST",
                body,
            }),
        }),
        deleteMyAddress: builder.mutation({
            query: (addressId: string) => ({
                url: `${USERS_URL}/current-user/addresses/${addressId}`,
                method: "DELETE",
            }),
        }),
        updateMyAddress: builder.mutation({
            query: (body: updateAddressReqBodyType & { addressId: string }) => ({
                url: `${USERS_URL}/current-user/addresses/${body.addressId}`,
                method: "PUT",
                body,
            }),
        }),
        uploadAvatar: builder.mutation({
            query: (formData: FormData) => ({
                url: `${USERS_URL}/current-user/avatar`,
                method: "PATCH",
                body: formData,
                formData: true,
            }),
        }),
    }),
});


export const { useGetCustomersQuery, useGetUserByIdQuery, useUpdateUserRoleMutation, useUpdateUserStatusMutation, useDeleteUserMutation, useGetCurrentUserQuery, useUpdateCurrentUserDetailsMutation, useUpdatePasswordMutation, useGetMyAddressesQuery, useAddNewAddressMutation, useDeleteMyAddressMutation, useUpdateMyAddressMutation, useUploadAvatarMutation, useGetAdminStatsQuery } = usersApiSlice;