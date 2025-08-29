import { paymentStatuses, zod } from "../../exports.js";
import { zodEnum, zodMongooseObjectId, zodNumber, zodString } from "../utils.zod.js";


export const createNewPaymentReqBody = zod.object({
    order: zodMongooseObjectId(),
    amount: zodNumber(),
    paymentMethod: zodString("Payment method is invalid."),
    transactionId: zodString("Transaction ID is invalid."),
    paymentGateway: zod.enum([ "razorpay", "cod" ], {message: "This is invalid."}),
}, {message: "This must be an object."});

export const updatePaymentReqBody = zod.object({
    status: zodEnum(paymentStatuses),
}, {message: "This must be an object."});