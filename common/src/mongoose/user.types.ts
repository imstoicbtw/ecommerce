import { type HydratedDocument, type Model, Types } from "mongoose";
import { type UserRole, userRoles } from "../constants.js";
import type { TMedia } from "./media.types.js";


// * Name
export interface INameRawDoc {
    firstName: string;
    lastName: string;
}

export interface INameMethods {
}

export interface INameVirtuals {
    fullName: string;
}

export type TNameModel = Model<INameRawDoc, {}, INameMethods, INameVirtuals>;
export type TName = HydratedDocument<INameRawDoc, INameMethods & INameVirtuals>;


// * Address
export interface IAddressRawDoc {
    name: TName;
    phoneNumber: string;
    countryCode: string;
    building: string;
    street: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
}

export interface IAddressMethods {
}

export interface IAddressVirtuals {
    fullAddress: string;
}

export type TAddressModel = Model<IAddressRawDoc, {}, IAddressMethods, IAddressVirtuals>;
export type TAddress = HydratedDocument<IAddressRawDoc, IAddressMethods & IAddressVirtuals>;
export type TAddressLean = IAddressRawDoc & IAddressVirtuals;


// * Cart Item
export interface ICartItemRawDoc {
    product: Types.ObjectId;
    quantity: number;
}

export interface ICartItemMethods {
}

export interface ICartItemVirtuals {
}

export type TCartItemModel = Model<ICartItemRawDoc, {}, ICartItemMethods, ICartItemVirtuals>;
export type TCartItem = HydratedDocument<ICartItemRawDoc, ICartItemMethods & ICartItemVirtuals>;
export type TCartItemLean = ICartItemRawDoc;


// * User
export interface IUserRawDoc {
    name: TName;
    email: string;
    password: string;
    role: UserRole;
    status: boolean;
    addresses: Array<TAddress>;
    avatar: TMedia;
    cartItems: Array<TCartItem>;
    refreshToken?: string | null;
}

export interface IUserMethods {
    comparePassword: (enteredPassword: string) => Promise<boolean>;
}

export interface IUserVirtuals {
}

export type TUserModel = Model<IUserRawDoc, {}, IUserMethods, IUserVirtuals>;
export type TUser = HydratedDocument<IUserRawDoc, IUserMethods & IUserVirtuals>;
export type TUserLean = Omit<IUserRawDoc & IUserVirtuals, "password">;