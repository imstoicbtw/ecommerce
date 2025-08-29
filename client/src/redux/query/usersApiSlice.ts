import { USERS_URL } from "../../../../common/dist/index.js";
import type { addNewAddressReqBodyType, addToCartReqBodyType, updateAddressReqBodyType, updateCartItemQuantityReqBodyType, updateCurrentUserDetailsReqBodyType, updatePasswordReqBodyType, updateUserRoleReqBodyType } from "common/dist/zod/requests/user.zod.ts";
import { apiSlice } from "./baseQuery.ts";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCustomers: builder.query({
            query: () => ({
                url: `${USERS_URL}/customers`,
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
            }),
        }),
        getCart: builder.query({
            query: () => ({
                url: `${USERS_URL}/current-user/cart`,
            }),
        }),
        addToCart: builder.mutation({
            query: (productId: addToCartReqBodyType) => ({
                url: `${USERS_URL}/current-user/cart`,
                method: "POST",
                body: { productId },
            }),
        }),
        updateCartItemQuantity: builder.mutation({
            query: (body: updateCartItemQuantityReqBodyType & { cartItemId: string }) => ({
                url: `${USERS_URL}/current-user/cart/${body.cartItemId}`,
                method: "PUT",
                body,
            }),
        }),
        removeFromCart: builder.mutation({
            query: (cartItemId: string) => ({
                url: `${USERS_URL}/current-user/cart/${cartItemId}`,
            }),
        }),
        clearCart: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/current-user/cart`,
                method: "DELETE",
            }),
        }),
    }),
});


export const { useGetCustomersQuery, useGetUserByIdQuery, useUpdateUserRoleMutation, useUpdateUserStatusMutation, useDeleteUserMutation, useGetCurrentUserQuery, useUpdateCurrentUserDetailsMutation, useUpdatePasswordMutation, useGetMyAddressesQuery, useAddNewAddressMutation, useDeleteMyAddressMutation, useUpdateMyAddressMutation, useGetCartQuery, useAddToCartMutation, useUpdateCartItemQuantityMutation, useRemoveFromCartMutation, useClearCartMutation } = usersApiSlice;