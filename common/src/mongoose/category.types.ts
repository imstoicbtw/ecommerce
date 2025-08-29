import { Model, HydratedDocument } from "mongoose";


export interface ICategoryRawDoc {
    name: string;
    slug: string;
}

export interface ICategoryMethods {
}

export interface ICategoryVirtuals {
}

export type TCategoryModel = Model<ICategoryRawDoc, {}, ICategoryMethods, ICategoryVirtuals>;
export type TCategory = HydratedDocument<ICategoryRawDoc, ICategoryMethods & ICategoryVirtuals>;
export type TCategoryLean = ICategoryRawDoc & ICategoryVirtuals;
