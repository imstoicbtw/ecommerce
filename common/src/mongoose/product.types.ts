import { type HydratedDocument, type Model, Types } from "mongoose";


// * Product Review
export interface IProductReviewRawDoc {
    title: string;
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    user: Types.ObjectId;
}

export interface IProductReviewMethods {
}

export interface IProductReviewVirtuals {
}

export type TProductReviewModel = Model<IProductReviewRawDoc, {}, IProductReviewMethods, IProductReviewVirtuals>;
export type TProductReview = HydratedDocument<IProductReviewRawDoc, IProductReviewMethods & IProductReviewVirtuals>;


// * Product
export interface IProductRawDoc {
    name: string;
    description: string;
    price: number;
    onSale: boolean;
    salePrice?: number;
    stock: number;
    isActive: boolean;
    category: Types.ObjectId;
    thumbnail: Types.ObjectId;
    gallery: Array<Types.ObjectId>;
    reviews: Array<TProductReview>;
}

export interface IProductMethods {
}

export interface IProductVirtuals {
    amountSaved: number;
}

export type TProductModel = Model<IProductRawDoc, {}, IProductMethods, IProductVirtuals>;
export type TProduct = HydratedDocument<IProductRawDoc, IProductMethods & IProductVirtuals>;
export type TProductLean = IProductRawDoc & IProductVirtuals;