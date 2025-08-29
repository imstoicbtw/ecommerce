import { zod } from "../../exports.js";
export declare const createOrderReqBody: zod.ZodObject<{
    products: zod.ZodArray<zod.ZodObject<{
        product: zod.ZodString;
        price: zod.ZodNumber;
        savedAmount: zod.ZodNumber;
        quantity: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        quantity: number;
        product: string;
        price: number;
        savedAmount: number;
    }, {
        quantity: number;
        product: string;
        price: number;
        savedAmount: number;
    }>, "atleastone">;
    totalAmount: zod.ZodNumber;
    savedAmount: zod.ZodNumber;
    status: zod.ZodEnum<["pending", "processing", "shipped", "delivered", "cancelled"]>;
    paymentStatus: zod.ZodEnum<["pending", "completed", "failed"]>;
    paymentMethod: zod.ZodString;
    shippingAddress: zod.ZodObject<{
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
}, "strip", zod.ZodTypeAny, {
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    savedAmount: number;
    products: [{
        quantity: number;
        product: string;
        price: number;
        savedAmount: number;
    }, ...{
        quantity: number;
        product: string;
        price: number;
        savedAmount: number;
    }[]];
    totalAmount: number;
    paymentStatus: "pending" | "failed" | "completed";
    paymentMethod: string;
    shippingAddress: {
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
    };
}, {
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    savedAmount: number;
    products: [{
        quantity: number;
        product: string;
        price: number;
        savedAmount: number;
    }, ...{
        quantity: number;
        product: string;
        price: number;
        savedAmount: number;
    }[]];
    totalAmount: number;
    paymentStatus: "pending" | "failed" | "completed";
    paymentMethod: string;
    shippingAddress: {
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
    };
}>;
export type createOrderReqBodyType = zod.infer<typeof createOrderReqBody>;
export declare const updateOrderReqBody: zod.ZodObject<{
    status: zod.ZodEnum<["pending", "processing", "shipped", "delivered", "cancelled"]>;
}, "strip", zod.ZodTypeAny, {
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}, {
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}>;
//# sourceMappingURL=order.zod.d.ts.map