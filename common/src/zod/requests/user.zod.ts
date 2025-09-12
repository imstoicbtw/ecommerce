import { userRoles } from "../../constants.js";
import { zod } from "../../exports.js";
import { zodAddress, zodEmail, zodEnum, zodMongooseObjectId, zodName, zodNumber, zodPassword, zodString } from "../utils.zod.js";

// * updateCurrentUserDetails
export const updateCurrentUserDetailsReqBody = zod.object({
    name: zodName,
    email: zodEmail(),
}, {message: "This must be an object."});
export type updateCurrentUserDetailsReqBodyType = zod.infer<typeof updateCurrentUserDetailsReqBody>;


// * updateUserRole
export const updateUserRoleReqBody = zod.object({
    role: zodEnum(Object.values(userRoles)),
});
export type updateUserRoleReqBodyType = zod.infer<typeof updateUserRoleReqBody>;


// * updatePassword
export const updatePasswordReqBody = zod.object({
    oldPassword: zodString("Old password is invalid"),
    newPassword: zodPassword(),
}, {message: "This must be an object."});
export type updatePasswordReqBodyType = zod.infer<typeof updatePasswordReqBody>;


// * addNewAddress
export const addNewAddressReqBody = zodAddress;
export type addNewAddressReqBodyType = zod.infer<typeof addNewAddressReqBody>;


// * updateAddress
export const updateAddressReqBody = zodAddress.partial();
export type updateAddressReqBodyType = zod.infer<typeof updateAddressReqBody>;


// * addToCart
export const addToCartReqBody = zod.object({
    product: zodMongooseObjectId(),
    quantity: zodNumber({min: 1}),
});
export type addToCartReqBodyType = zod.infer<typeof addToCartReqBody>;


// * updateCartItemQuantity
export const updateCartItemQuantityReqBody = zod.object({
    quantity: zodNumber({min: 1}),
});
export type updateCartItemQuantityReqBodyType = zod.infer<typeof updateCartItemQuantityReqBody>;