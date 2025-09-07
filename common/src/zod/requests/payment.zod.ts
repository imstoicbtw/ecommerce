import { paymentStatuses, zod } from "../../exports.js";
import { zodEnum, zodMongooseObjectId, zodNumber, zodString } from "../utils.zod.js";


export const createNewPaymentReqBody = zod.object({
    order: zodMongooseObjectId(),
    amount: zodNumber(),
    transactionId: zodString("Transaction ID is invalid."),
    status: zodEnum(paymentStatuses),
    update_time: zodString("Update time is invalid."),
    email_address: zodString("Email address is invalid."),
    paymentGateway: zod.enum([ "paypal", "cod" ], { message: "This is invalid." }),
}, { message: "This must be an object." });
export type createNewPaymentReqBodyType = zod.infer<typeof createNewPaymentReqBody>;

export const updatePaymentReqBody = zod.object({
    status: zodEnum(paymentStatuses),
}, { message: "This must be an object." });