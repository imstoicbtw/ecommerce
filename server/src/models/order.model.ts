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
    payment: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        default: null,
    },
    products: {
        type: [ orderItemSchema ],
        required: [ true, "Ordered product is required." ],
    },
    subTotal: {
        type: Number,
        required: [ true, "Subtotal is required." ],
    },
    totalAmount: {
        type: Number,
        required: [ true, "Total order amount is required." ],
    },
    savedAmount: {
        type: Number,
    },
    shippingAmount: {
        type: Number,
        required: [ true, "Shipping amount is required." ],
    },
    taxAmount: {
        type: Number,
        required: [ true, "Tax amount is required." ],
    },
    status: {
        type: String,
        enum: {
            values: [ "pending", "processing", "shipped", "delivered", "cancelled", "refunded", "failed" ],
            message: "{VALUE} is not a valid status.",
        },
        default: "pending",
    },
    shippingAddress: {
        type: addressSchema,
        required: [ true, "Shipping address is required." ],
    },
}, { timestamps: true });

orderSchema.pre("find", function (next) {
    this.sort("-createdAt");
    next();
});


export const OrderModel: TOrderModel = model<IOrderRawDoc, TOrderModel, IOrderMethods>("Order", orderSchema);