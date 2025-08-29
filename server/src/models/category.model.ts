import { HydratedDocument, Model, model, Schema, Types } from "mongoose";
import type { ICategoryMethods, ICategoryRawDoc, ICategoryVirtuals, TCategoryModel } from "../../../common/dist/mongoose/category.types.js";


const categorySchema: Schema = new Schema<ICategoryRawDoc, TCategoryModel, ICategoryMethods, {}, ICategoryVirtuals>({
    name: {
        type: String,
        required: [ true, "Category name is required." ],
    },
    slug: {
        type: String,
        required: [ true, "Category slug is required." ],
        unique: [ true, "Slug already in use." ],
    },
}, { timestamps: true });


export const CategoryModel: TCategoryModel = model<ICategoryRawDoc, TCategoryModel, ICategoryMethods>("Category", categorySchema);