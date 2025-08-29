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
    paymentMethod: {
        type: String,
    },
    status: {
        type: String,
        enum: {
            values: [ "pending", "completed", "failed" ],
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
            values: [ "razorpay", "cod" ],
            message: "{VALUE} is not a valid payment gateway.",
        },
    },
}, { timestamps: true });


export const PaymentModel: TPaymentModel = model<IPaymentRawDoc, TPaymentModel, IPaymentMethods>("Payment", paymentSchema);