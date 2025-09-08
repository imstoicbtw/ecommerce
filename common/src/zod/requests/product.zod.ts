import { zod } from "../../exports.js";
import { zodMongooseObjectId, zodNumber, zodString } from "../utils.zod.js";


// * createProduct
export const createProductReqBody = zod.object({
    name: zodString("Product name is not valid.", { min: 5 }),
    description: zodString("Product description is not valid.", { min: 50 }),
    price: zodNumber(),
    onSale: zod.boolean({ message: "This is not an acceptable option." }).default(false),
    salePrice: zodNumber().optional(),
    stock: zodNumber(),
    isActive: zod.boolean({ message: "This is not an acceptable option." }).default(true).optional(),
    category: zodMongooseObjectId(),
    thumbnail: zodMongooseObjectId(),
    gallery: zod.array(zodMongooseObjectId()).optional(),
}, { message: "This must be an object." });
export type createProductReqBodyType = zod.infer<typeof createProductReqBody>;


// * updateProduct
export const updateProductReqBody = createProductReqBody.partial();
export type updateProductReqBodyType = zod.infer<typeof updateProductReqBody>;


// * updateProductProperty
export const updateProductPropertyReqBody = zod.object({
    key: zodString("Key is not valid."),
    value: zod.any(),
}, { message: "This must be an object." });
export type updateProductPropertyReqBodyType = zod.infer<typeof updateProductPropertyReqBody>;


// * submitReview
export const submitReviewReqBody = zod.object({
    title: zodString("Title is not valid.", { min: 10 }),
    rating: zodNumber({ message: "This must be a number." })
        .refine(rating => rating >= 1 && rating <= 5, "This must be a number between 1 and 5."),
    comment: zodString("Comment is not valid.", { min: 20 }),
}, { message: "This must be an object." });
export type submitReviewReqBodyType = zod.infer<typeof submitReviewReqBody>;


// * editReview
export const editReviewReqBody = submitReviewReqBody.partial();
export type editReviewReqBodyType = zod.infer<typeof editReviewReqBody>;