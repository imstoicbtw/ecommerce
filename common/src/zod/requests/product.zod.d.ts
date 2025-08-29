import { zod } from "../../exports.js";
export declare const createProductReqBody: zod.ZodObject<{
    name: zod.ZodString;
    description: zod.ZodString;
    price: zod.ZodNumber;
    onSale: zod.ZodDefault<zod.ZodBoolean>;
    salePrice: zod.ZodOptional<zod.ZodNumber>;
    stock: zod.ZodDefault<zod.ZodNumber>;
    isActive: zod.ZodDefault<zod.ZodBoolean>;
    category: zod.ZodString;
    thumbnail: zod.ZodString;
    gallery: zod.ZodOptional<zod.ZodArray<zod.ZodString, "many">>;
}, "strip", zod.ZodTypeAny, {
    name: string;
    price: number;
    description: string;
    onSale: boolean;
    stock: number;
    isActive: boolean;
    category: string;
    thumbnail: string;
    salePrice?: number | undefined;
    gallery?: string[] | undefined;
}, {
    name: string;
    price: number;
    description: string;
    category: string;
    thumbnail: string;
    onSale?: boolean | undefined;
    salePrice?: number | undefined;
    stock?: number | undefined;
    isActive?: boolean | undefined;
    gallery?: string[] | undefined;
}>;
export declare const submitReviewReqBody: zod.ZodObject<{
    title: zod.ZodString;
    rating: zod.ZodEffects<zod.ZodNumber, number, number>;
    comment: zod.ZodString;
    user: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    user: string;
    title: string;
    rating: number;
    comment: string;
}, {
    user: string;
    title: string;
    rating: number;
    comment: string;
}>;
export declare const editReviewReqBody: zod.ZodObject<Omit<{
    title: zod.ZodString;
    rating: zod.ZodEffects<zod.ZodNumber, number, number>;
    comment: zod.ZodString;
    user: zod.ZodString;
}, "user">, "strip", zod.ZodTypeAny, {
    title: string;
    rating: number;
    comment: string;
}, {
    title: string;
    rating: number;
    comment: string;
}>;
export declare const updateProductPropertyReqBody: zod.ZodObject<{
    key: zod.ZodString;
    value: zod.ZodAny;
}, "strip", zod.ZodTypeAny, {
    key: string;
    value?: any;
}, {
    key: string;
    value?: any;
}>;
//# sourceMappingURL=product.zod.d.ts.map