import { model, Schema } from "mongoose";
import type { IOrderMethods, IOrderRawDoc, IOrderVirtuals, TOrderModel } from "../../../common/dist/mongoose/order.types.js";
import { addressSchema } from "./subdocs/address.model.js";
import { orderItemSchema } from "./subdocs/order-item.model.js";


const orderSchema: Schema = new Schema<IOrderRawDoc, TOrderModel, IOrderMethods, {}, IOrderVirtuals>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [ true, "User is required." ],
    },
    products: {
        type: [ orderItemSchema ],
        required: [ true, "Ordered product is required." ],
    },
    totalAmount: {
        type: Number,
        required: [ true, "Total order amount is required." ],
    },
    savedAmount: {
        type: Number,
    },
    status: {
        type: String,
        enum: {
            values: [ "pending", "processing", "shipped", "delivered", "cancelled" ],
            message: "{VALUE} is not a valid status.",
        },
        default: "pending",
    },
    paymentStatus: {
        type: String,
        enum: {
            values: [ "pending", "paid", "failed" ],
            message: "{VALUE} is not a valid payment status.",
        },
        default: "pending",
    },
    paymentMethod: {
        type: String,
    },
    shippingAddress: {
        type: addressSchema,
        required: [ true, "Shipping address is required." ],
    },
}, { timestamps: true });


export const OrderModel: TOrderModel = model<IOrderRawDoc, TOrderModel, IOrderMethods>("Order", orderSchema);