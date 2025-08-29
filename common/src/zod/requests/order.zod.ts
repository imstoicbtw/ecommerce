import { orderStatuses, paymentStatuses, zod } from "../../exports.js";
import { zodAddress, zodEnum, zodMongooseObjectId, zodNumber, zodString } from "../utils.zod.js";


export const createOrderReqBody = zod.object({
    products: zod.array(zod.object({
        product: zodMongooseObjectId(),
        price: zodNumber(),
        savedAmount: zodNumber(),
        quantity: zodNumber(),
    })).nonempty("At least one product is required to place an order."),
    totalAmount: zodNumber(),
    savedAmount: zodNumber(),
    status: zodEnum(orderStatuses),
    paymentStatus: zodEnum(paymentStatuses),
    paymentMethod: zodString("Payment method is invalid."),
    shippingAddress: zodAddress,
}, { message: "This must be an object." });
export type createOrderReqBodyType = zod.infer<typeof createOrderReqBody>;


export const updateOrderStatusReqBody = zod.object({
    status: zodEnum(orderStatuses),
}, { message: "This must be an object." });
export type updateOrderStatusReqBodyType = zod.infer<typeof updateOrderStatusReqBody>;