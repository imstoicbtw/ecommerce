import { zod } from "../../exports.js";
export declare const createCategoryReqBody: zod.ZodObject<{
    name: zod.ZodString;
    slug: zod.ZodString;
    parent: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    name: string;
    slug: string;
    parent?: string | undefined;
}, {
    name: string;
    slug: string;
    parent?: string | undefined;
}>;
//# sourceMappingURL=category.zod.d.ts.map