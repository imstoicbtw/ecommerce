// * Payment
import { type HydratedDocument, type Model, Types } from "mongoose";


export interface IPaymentRawDoc {
    user: Types.ObjectId;
    order: Types.ObjectId;
    amount: number;
    transactionId: string;
    status: string;
    update_time: string;
    email_address: string;
    paymentGateway: "paypal" | "cod";
}

export interface IPaymentMethods {
}

export interface IPaymentVirtuals {
}

export type TPaymentModel = Model<IPaymentRawDoc, {}, IPaymentMethods, IPaymentVirtuals>;
export type TPayment = HydratedDocument<IPaymentRawDoc, IPaymentMethods & IPaymentVirtuals>;