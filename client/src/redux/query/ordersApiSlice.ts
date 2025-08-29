import { ORDERS_URL } from "common/dist/index.ts";
import type { createOrderReqBodyType, updateOrderStatusReqBodyType } from "common/dist/zod/requests/order.zod.ts";
import { apiSlice } from "./baseQuery.ts";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
            }),
        }),
        getOrderById: builder.query({
            query: (orderId: string) => ({
                url: `${ORDERS_URL}/${orderId}`,
            }),
        }),
        createOrder: builder.mutation({
            query: (body: createOrderReqBodyType) => ({
                url: ORDERS_URL,
                method: "POST",
                body,
            }),
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/current-user`,
            }),
        }),
        getMyOrderById: builder.query({
            query: (orderId: string) => ({
                url: `${ORDERS_URL}/current-user/${orderId}`,
            }),
        }),
        updateOrderStatus: builder.mutation({
            query: (body: updateOrderStatusReqBodyType & {orderId: string}) => ({
                url: `${ORDERS_URL}/${body.orderId}/update`,
                method: "PATCH",
                body,
            }),
        }),
        cancelOrder: builder.mutation({
            query: (orderId: string) => ({
                url: `${ORDERS_URL}/${orderId}/cancel`,
                method: "PATCH",
            }),
        }),
    }),
});


export const {useGetAllOrdersQuery, useGetOrderByIdQuery, useCreateOrderMutation, useGetMyOrdersQuery, useGetMyOrderByIdQuery, useUpdateOrderStatusMutation, useCancelOrderMutation} = ordersApiSlice;