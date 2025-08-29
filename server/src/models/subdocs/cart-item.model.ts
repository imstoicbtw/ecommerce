import { model, Schema } from "mongoose";
import type { ICartItemMethods, ICartItemRawDoc, ICartItemVirtuals, TCartItemModel } from "../../../../common/dist/mongoose/user.types.js";


export const cartItemSchema: Schema = new Schema<ICartItemRawDoc, TCartItemModel, ICartItemMethods, {}, ICartItemVirtuals>({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [ true, "Product is required." ],
    },
    quantity: {
        type: Number,
        required: [ true, "Item quantity is required." ],
    },
});


export const CartItemModel: TCartItemModel = model<
    ICartItemRawDoc,
    TCartItemModel,
    ICartItemMethods
>("CartItem", cartItemSchema);