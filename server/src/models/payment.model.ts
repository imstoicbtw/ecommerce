import { model, Schema } from "mongoose";
import type { IPaymentMethods, IPaymentRawDoc, IPaymentVirtuals, TPaymentModel } from "../../../common/dist/mongoose/payment.types.js";


const paymentSchema: Schema = new Schema<IPaymentRawDoc, TPaymentModel, IPaymentMethods, {}, IPaymentVirtuals>({
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: [ true, "Order is required." ],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [ true, "User is required." ],
    },
    amount: {
        type: Number,
        required: [ true, "Amount is required." ],
    },
    status: {
        type: String,
        enum: {
            values: [ "completed", "failed", "pending" ],
            message: "{VALUE} is not a valid payment status.",
        },
        default: "pending",
    },
    transactionId: {
        type: String,
        required: [ true, "Transaction ID is required." ],
    },
    paymentGateway: {
        type: String,
        required: [ true, "Payment Gateway is required." ],
        enum: {
            values: [ "paypal", "cod" ],
            message: "{VALUE} is not a valid payment gateway.",
        },
    },
    update_time: {
        type: String,
        required: [ true, "Update time is required." ],
    },
    email_address: {
        type: String,
        required: [ true, "Payment email address is required." ],
    },
}, { timestamps: true });


export const PaymentModel: TPaymentModel = model<IPaymentRawDoc, TPaymentModel, IPaymentMethods>("Payment", paymentSchema);