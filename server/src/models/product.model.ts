import { IProductRawDoc } from "common/dist/mongoose/product.types.js";
import { model, Schema } from "mongoose";
import type { IProductMethods, IProductVirtuals, TProduct, TProductModel } from "../../../common/dist/mongoose/product.types.js";
import { productReviewSchema } from "./subdocs/product-review.model.js";


const productSchema: Schema = new Schema<IProductRawDoc, TProductModel, IProductMethods, {}, IProductVirtuals>({
    name: {
        type: String,
        required: [ true, "Product name is required." ],
    },
    description: {
        type: String,
        required: [ true, "Product description is required." ],
    },
    price: {
        type: Number,
        min: 0,
        required: [ true, "Product price is required." ],
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    salePrice: {
        type: Number,
        min: 0,
        validate: {
            validator: function (this: IProductRawDoc, salePrice: number): boolean {
                return salePrice < this.price;
            },
            message: "Sale price should be less than regular price.",
        },
    },
    stock: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [ true, "Product category is required." ],
    },
    thumbnail: {
        type: Schema.Types.ObjectId,
        ref: "Media",
        required: [ true, "Product thumbnail is required." ],
    },
    gallery: {
        type: [ Schema.Types.ObjectId ],
        ref: "Media",
        default: [],
    },
    reviews: {
        type: [ productReviewSchema ],
        default: [],
    },
}, { timestamps: true });

productSchema.virtual("amountSaved")
             .get(function (this: TProduct): number {
                 if (!this.salePrice) return 0;
                 return this.price - this.salePrice;
             });

productSchema.pre("find", function (next) {
    this.sort("-createdAt");
    next();
});


export const ProductModel: TProductModel = model<IProductRawDoc, TProductModel, IProductMethods>("Product", productSchema);