import { PAYMENTS_URL } from "common/dist/index.js";
import type { createNewPaymentReqBodyType } from "common/dist/zod/requests/payment.zod.js";
import { apiSlice } from "./baseQuery.ts";


type RequestQuery = {
    size?: number;
    page?: number;
    keyword?: string;
}

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPayments: builder.query({
            query: ({ size, page, keyword }: RequestQuery) => (
                `${PAYMENTS_URL}/?size=${size || 8}&page=${page || 1}&keyword=${keyword || ""}`
            ),
        }),
        getPaymentById: builder.query({
            query: (paymentId: string) => `${PAYMENTS_URL}/${paymentId}`,
        }),
        createPayment: builder.mutation({
            query: (body: createNewPaymentReqBodyType) => ({
                url: PAYMENTS_URL,
                method: "POST",
                body,
            }),
        }),
        getPaypalClientId: builder.query({
            query: () => `${PAYMENTS_URL}/paypal`,
        }),
    }),
});

export const { useGetAllPaymentsQuery, useGetPaymentByIdQuery, useCreatePaymentMutation, useGetPaypalClientIdQuery } = paymentApiSlice;