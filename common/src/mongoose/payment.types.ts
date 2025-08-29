// * Payment
import { type HydratedDocument, type Model, Types } from "mongoose";


export interface IPaymentRawDoc {
    order: Types.ObjectId;
    user: Types.ObjectId;
    amount: number;
    paymentMethod: string;
    status: "pending" | "completed" | "failed";
    transactionId: string;
    paymentGateway: "razorpay" | "cod";
}

export interface IPaymentMethods {
}

export interface IPaymentVirtuals {
}

export type TPaymentModel = Model<IPaymentRawDoc, {}, IPaymentMethods, IPaymentVirtuals>;
export type TPayment = HydratedDocument<IPaymentRawDoc, IPaymentMethods & IPaymentVirtuals>;