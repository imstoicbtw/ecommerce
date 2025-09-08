import { model, Schema } from "mongoose";
import type { IProductReviewMethods, IProductReviewRawDoc, IProductReviewVirtuals, TProductReviewModel } from "../../../../common/dist/mongoose/product.types.js";


export const productReviewSchema: Schema = new Schema<IProductReviewRawDoc, TProductReviewModel, IProductReviewMethods, {}, IProductReviewVirtuals>({
    title: {
        type: String,
        required: [ true, "Review title is required" ],
    },
    rating: {
        type: Number,
        required: [ true, "Rating is required" ],
    },
    comment: {
        type: String,
        required: [ true, "Comment is required" ],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [ true, "User is required" ],
    },
}, { timestamps: true });

export const ProductReviewModel: TProductReviewModel = model<
    IProductReviewRawDoc,
    TProductReviewModel,
    IProductReviewMethods
>("ProductReview", productReviewSchema);