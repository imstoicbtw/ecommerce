import type { createProductReqBodyType, editReviewReqBodyType, submitReviewReqBodyType, updateProductPropertyReqBodyType, updateProductReqBodyType } from "common/dist/zod/requests/product.zod.ts";
import { PRODUCTS_URL } from "../../../../common/dist/index.js";
import { apiSlice } from "./baseQuery.ts";


export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductById: builder.query({
            query: (productId: string) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
        }),
        createProduct: builder.mutation({
            query: (body: createProductReqBodyType) => ({
                url: PRODUCTS_URL,
                method: "POST",
                body,
            }),
        }),
        updateProduct: builder.mutation({
            query: (body: updateProductReqBodyType & {productId: string}) => ({
                url: `${PRODUCTS_URL}/${body.productId}`,
                method: "PUT",
                body,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId: string) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "DELETE",
            }),
        }),
        updateProductProperty: builder.mutation({
            query: (body: updateProductPropertyReqBodyType & {productId: string}) => ({
                url: `${PRODUCTS_URL}/${body.productId}`,
                method: "PATCH",
                body,
            }),
        }),
        getProductReviews: builder.query({
            query: (productId: string) => ({
                url: `${PRODUCTS_URL}/${productId}/reviews`,
            }),
        }),
        submitProductReview: builder.mutation({
            query: (body: submitReviewReqBodyType & {productId: string}) => ({
                url: `${PRODUCTS_URL}/${body.productId}/reviews`,
                method: "POST",
                body,
            }),
        }),
        deleteProductReview: builder.mutation({
            query: (productId: string) => ({
                url: `${PRODUCTS_URL}/${productId}/reviews`,
                method: "DELETE",
            }),
        }),
        editProductReview: builder.mutation({
            query: (body: editReviewReqBodyType & {productId: string, reviewId: string}) => ({
                url: `${PRODUCTS_URL}/${body.productId}/reviews/${body.reviewId}`,
                method: "PUT",
                body,
            }),
        }),
    }),
});

export const {useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useUpdateProductPropertyMutation, useGetProductReviewsQuery, useSubmitProductReviewMutation, useDeleteProductReviewMutation, useEditProductReviewMutation} = productsApiSlice;