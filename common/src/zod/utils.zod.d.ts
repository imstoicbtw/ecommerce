import { zod } from "../exports.js";
export declare function zodEmail(): zod.ZodString;
export declare function zodPassword(): zod.ZodString;
export declare function zodString({ min, max, length, }?: {
    min?: number;
    max?: number;
    length?: number;
}): zod.ZodString;
export declare function zodNumber({ min, max, }?: {
    min?: number;
    max?: number;
}): zod.ZodNumber;
export declare function zodMongooseObjectId(): zod.ZodString;
export declare const zodName: zod.ZodObject<{
    firstName: zod.ZodString;
    lastName: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    firstName: string;
    lastName: string;
}, {
    firstName: string;
    lastName: string;
}>;
export declare const zodAddress: zod.ZodObject<{
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
//# sourceMappingURL=utils.zod.d.ts.map