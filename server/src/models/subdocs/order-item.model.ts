import { model, Schema } from "mongoose";
import type { IOrderItemMethods, IOrderItemRawDoc, IOrderItemVirtuals, TOrderItemModel } from "../../../../common/dist/mongoose/order.types.js";


export const orderItemSchema: Schema = new Schema<IOrderItemRawDoc, TOrderItemModel, IOrderItemMethods, {}, IOrderItemVirtuals>({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [ true, "Product is required." ],
    },
    price: {
        type: Number,
        required: [ true, "Price is required." ],
    },
    savedAmount: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        required: [ true, "Item quantity is required." ],
    },
});

export const OrderItemModel: TOrderItemModel = model<
    IOrderItemRawDoc,
    TOrderItemModel,
    IOrderItemMethods
>("OrderItem", orderItemSchema);