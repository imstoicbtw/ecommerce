import { zod } from "../../exports.js";
export declare const updateCurrentUserDetailsReqBody: zod.ZodObject<{
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
}, "strip", zod.ZodTypeAny, {
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
}, {
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
}>;
export type updateCurrentUserDetailsReqBodyType = zod.infer<typeof updateCurrentUserDetailsReqBody>;
export declare const updateUserRoleReqBody: zod.ZodObject<{
    role: zod.ZodEnum<[string, ...string[]]>;
}, "strip", zod.ZodTypeAny, {
    role: string;
}, {
    role: string;
}>;
export declare const updatePasswordReqBody: zod.ZodObject<{
    oldPassword: zod.ZodString;
    newPassword: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    oldPassword: string;
    newPassword: string;
}, {
    oldPassword: string;
    newPassword: string;
}>;
export type updatePasswordReqBodyType = zod.infer<typeof updatePasswordReqBody>;
export declare const addNewAddressReqBody: zod.ZodObject<{
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
    phoneNumber: zod.ZodString;
    countryCode: zod.ZodString;
    building: zod.ZodString;
    street: zod.ZodString;
    city: zod.ZodString;
    state: zod.ZodString;
    pinCode: zod.ZodString;
    country: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    name: {
        firstName: string;
        lastName: string;
    };
    phoneNumber: string;
    countryCode: string;
    building: string;
    street: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
}, {
    name: {
        firstName: string;
        lastName: string;
    };
    phoneNumber: string;
    countryCode: string;
    building: string;
    street: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
}>;
export type addNewAddressReqBodyType = zod.infer<typeof addNewAddressReqBody>;
export declare const addToCartReqBody: zod.ZodObject<{
    product: zod.ZodString;
    quantity: zod.ZodNumber;
}, "strip", zod.ZodTypeAny, {
    quantity: number;
    product: string;
}, {
    quantity: number;
    product: string;
}>;
export type addToCartReqBodyType = zod.infer<typeof addToCartReqBody>;
//# sourceMappingURL=user.zod.d.ts.map