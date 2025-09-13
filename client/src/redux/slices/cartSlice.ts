import { createSlice } from "@reduxjs/toolkit";
import type { IMediaRawDoc } from "common/dist/mongoose/media.types.ts";
import type { IProductRawDoc } from "common/dist/mongoose/product.types.ts";
import { type PayloadAction } from "@reduxjs/toolkit";
import type { addNewAddressReqBodyType } from "common/dist/zod/requests/user.zod.ts";


export type CartItem = {
    product: Omit<IProductRawDoc, "thumbnail" | "gallery" | "reviews" | "category" | "description"> & {
        _id: string;
        thumbnail: IMediaRawDoc|null;
    };
    quantity: number;
};

export const initialNewAddress = {
    name: { firstName: "", lastName: "" }, phoneNumber: "", countryCode: "91", building: "", street: "", city: "", state: "", pinCode: "", country: "India",
};
const localCart = localStorage.getItem("cart");
const initialState: {
    items: CartItem[];
    itemsPrice: number;
    discountPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    address: addNewAddressReqBodyType & { _id: string } | null;
} = localCart ? JSON.parse(localCart) : {
    items: [],
    itemsPrice: 0,
    discountPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    address: null,
};


export const cartSlice = createSlice({
    name: "cart",
    reducerPath: "cart",
    initialState,
    reducers: {
        addToCart: (cart, action: PayloadAction<CartItem>) => {
            const itemIndex = cart.items.findIndex(item => (
                item.product._id === action.payload.product._id
            ));
            if (itemIndex >= 0) {
                cart.items[itemIndex].quantity += action.payload.quantity;
            } else {
                cart.items.push(action.payload);
            }
            return updateCart(cart);
        },
        removeFromCart: (cart, action: PayloadAction<string>) => {
            cart.items = cart.items.filter(item => item.product._id !== action.payload);
            return updateCart(cart);
        },
        incrementFromCart: (cart, action: PayloadAction<string>) => {
            const cartItem = cart.items.find(item => item.product._id === action.payload);
            if (cartItem) cartItem.quantity += 1;
            return updateCart(cart);
        },
        decrementFromCart: (cart, action: PayloadAction<string>) => {
            const cartItem = cart.items.find(item => item.product._id === action.payload);
            if (cartItem) cartItem.quantity -= 1;
            return updateCart(cart);
        },
        clearFromCart: (cart) => {
            cart.items = [];
            return updateCart(cart);
        },
        addAddress: (cart, action: PayloadAction<addNewAddressReqBodyType & { _id: string }>) => {
            cart.address = { ...action.payload };
            updateCart(cart);
        },
    },
});


export const {
    addToCart,
    removeFromCart,
    incrementFromCart,
    decrementFromCart,
    clearFromCart,
    addAddress,
} = cartSlice.actions;


function updateCart (cart: typeof initialState) {
    cart.itemsPrice = +cart.items
                           .reduce((acc, item) => {
                               if (item.product.onSale) return acc + item.product.salePrice! * item.quantity;
                               return acc + item.product.price * item.quantity;
                           }, 0)
                           .toFixed(2);
    cart.discountPrice = +cart.items
                              .filter(item => item.product.onSale)
                              .reduce((acc, item) => {
                                  return acc + (item.product.price - item.product.salePrice!) * item.quantity;
                              }, 0)
                              .toFixed(2);
    cart.shippingPrice = cart.itemsPrice > 5000 ? 0 : 80;
    cart.taxPrice = +(cart.itemsPrice * 0.18).toFixed(2);
    cart.totalPrice = +(cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2);
    localStorage.setItem(cartSlice.reducerPath, JSON.stringify(cart));
    return cart;
}