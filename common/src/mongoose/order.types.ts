import { type HydratedDocument, type Model, Types } from "mongoose";
import type { OrderStatus } from "../constants.js";
import type { TAddress } from "./user.types.js";


// * Order Item
export interface IOrderItemRawDoc {
    product: Types.ObjectId;
    price: number;
    savedAmount: number;
    quantity: number;
}

export interface IOrderItemMethods {
}

export interface IOrderItemVirtuals {
}

export type TOrderItemModel = Model<IOrderItemRawDoc, {}, IOrderItemMethods, IOrderItemVirtuals>;
export type TOrderItem = HydratedDocument<IOrderItemRawDoc, IOrderItemMethods & IOrderItemVirtuals>;


// * Order
export interface IOrderRawDoc {
    payment: Types.ObjectId | null;
    user: Types.ObjectId;
    products: Array<TOrderItem>;
    subTotal: number;
    totalAmount: number;
    savedAmount: number;
    shippingAmount: number;
    taxAmount: number;
    status: OrderStatus;
    shippingAddress: TAddress;
}

export interface IOrderMethods {
}

export interface IOrderVirtuals {
}

export type TOrderModel = Model<IOrderRawDoc, {}, IOrderMethods, IOrderVirtuals>;
export type TOrder = HydratedDocument<IOrderRawDoc, IOrderMethods & IOrderVirtuals>;
export type TOrderLean = IOrderRawDoc & IOrderVirtuals;