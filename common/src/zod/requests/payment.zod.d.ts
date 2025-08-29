import { zod } from "../../exports.js";
export declare const createNewPaymentReqBody: zod.ZodObject<{
    order: zod.ZodString;
    amount: zod.ZodNumber;
    paymentMethod: zod.ZodString;
    transactionId: zod.ZodString;
    paymentGateway: zod.ZodEnum<["razorpay", "cod"]>;
}, "strip", zod.ZodTypeAny, {
    paymentMethod: string;
    order: string;
    amount: number;
    transactionId: string;
    paymentGateway: "razorpay" | "cod";
}, {
    paymentMethod: string;
    order: string;
    amount: number;
    transactionId: string;
    paymentGateway: "razorpay" | "cod";
}>;
export declare const updatePaymentReqBody: zod.ZodObject<{
    status: zod.ZodEnum<["pending", "completed", "failed"]>;
}, "strip", zod.ZodTypeAny, {
    status: "pending" | "failed" | "completed";
}, {
    status: "pending" | "failed" | "completed";
}>;
//# sourceMappingURL=payment.zod.d.ts.map