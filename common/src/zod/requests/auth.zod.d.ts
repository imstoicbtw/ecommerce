import { z as zod } from "zod";
export declare const registerUserReqBody: zod.ZodObject<{
    name: zod.ZodObject<{
        firstName: zod.ZodString;
        lastName: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        firstName: string;
        lastName: string;
    }, {
        firstName: string;
        lastName: string;
    }>;
    email: zod.ZodString;
    password: zod.ZodString;
    role: zod.ZodDefault<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    name: {
        firstName: string;
        lastName: string;
    };
    password: string;
    email: string;
    role: string;
}, {
    name: {
        firstName: string;
        lastName: string;
    };
    password: string;
    email: string;
    role?: string | undefined;
}>;
export type registerUserReqBodyType = zod.infer<typeof registerUserReqBody>;
export declare const loginUserReqBody: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    password: string;
    email: string;
}, {
    password: string;
    email: string;
}>;
export type loginUserReqBodyType = zod.infer<typeof loginUserReqBody>;
//# sourceMappingURL=auth.zod.d.ts.map