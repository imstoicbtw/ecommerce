import { zod } from "../../exports.js";
export declare const updateMediaReqBody: zod.ZodObject<{
    name: zod.ZodOptional<zod.ZodString>;
    alt: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    name?: string | undefined;
    alt?: string | undefined;
}, {
    name?: string | undefined;
    alt?: string | undefined;
}>;
export type updateMediaReqBodyType = zod.infer<typeof updateMediaReqBody>;
//# sourceMappingURL=media.zod.d.ts.map