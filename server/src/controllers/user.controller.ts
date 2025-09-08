import type { TAddress, TAddressLean, TCartItem, TCartItemLean, TUser, TUserLean } from "common/dist/mongoose/user.types.js";
import { Request, Response } from "express";
import { DeleteResult } from "mongoose";
import { userRoles } from "../../../common/dist/constants.js";
import { updatePasswordReqBodyType } from "../../../common/dist/zod/requests/user.zod.js";
import AddressModel from "../models/subdocs/address.model.js";
import { CartItemModel } from "../models/subdocs/cart-item.model.js";
import { UserModel } from "../models/user.model.js";
import { destroyFromCloudinary } from "../utils/cloudinary.util.js";


// ~ ADMIN ROUTES 

/**
 * Get all customers.
 * @access [ admin, manager ]
 * GET /api/users/customers/
 */
export async function getCustomers (req: Request, res: Response): Promise<void> {
    const { page = 1, size = 8, keyword } = req.query;
    const searchQuery = keyword
        ? {
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        } : {};

    const count = await UserModel.countDocuments({ ...searchQuery });
    const customers: TUser[] = await UserModel
        .find({ ...searchQuery })
        .limit(+size)
        .skip((+page - 1) * +size);

    res.json({
        success: true,
        message: `${customers.length} customer(s) found.`,
        meta: {
            pageCount: Math.ceil(count / +size),
            page: +page,
            size: +size,
        },
        data: customers,
    });
}


/**
 * Get all managers.
 * @access [ admin ]
 * GET /api/users/managers/
 */
export async function getManagers (req: Request, res: Response): Promise<void> {
    const managers: Array<TUser> = await UserModel.find({ role: userRoles.Manager }, "-password");
    res.json({
        success: true,
        message: `${managers.length} manager(s) found.`,
        data: managers,
    });
}


/**
 * Get user by id.
 * @access [admin, manager]
 * GET /api/users/user/:userId/
 */
export async function getUserById (req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const user: TUser | null = await UserModel.findById(userId, "-password");
    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }
    res.json({
        success: true,
        data: user,
    });
}


/**
 * Update user role.
 * @access [admin]
 * PATCH /api/users/user/:userId/role/
 */
export async function updateUserRole (req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const { role } = req.body;
    const user: TUser | null = await UserModel.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }
    user.set({ role });
    const result: TUser = await user.save();
    res.json({
        success: true,
        message: "User role updated successfully.",
        data: result.toObject({ virtuals: true }),
    });

}


/**
 * Update user status.
 * @access [admin]
 * PATCH /api/users/user/:userId/status/
 */
export async function updateUserStatus (req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const user: TUser | null = await UserModel.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }
    user.set("status", !user.status);
    const result: TUser = await user.save();
    res.json({
        success: true,
        message: "User status updated successfully.",
        data: result,
    });

}


// ~ USER

/**
 * Get the current user.
 * @access Current authenticated user.
 * GET /api/users/current-user/
 */
export async function getCurrentUser (req: Request, res: Response): Promise<void> {
    res.json({
        success: true,
        message: "Here are your details!",
        data: req.user,
    });
}


/**
 * Update the current user.
 * @access Current authenticated user.
 * PATCH /api/users/current-user/
 */
export async function updateCurrentUserDetails (req: Request, res: Response): Promise<void> {
    const { user, body } = req;
    user.set(body);
    const updatedUser: TUser = await user.save();
    res.json({
        success: true,
        message: "Details updated successfully!",
        data: updatedUser,
    });
}


/**
 * Update the current user avatar.
 * @access Current authenticated user.
 * PATCH /api/users/current-user/avatar/
 */
// TODO: Add mutation in client.
export async function updateCurrentUserAvatar (req: Request, res: Response): Promise<void> {
    const { user, media } = req;
    if (user.avatar) {
        try {
            await destroyFromCloudinary(user.avatar.publicId);
        } catch (error) {
            console.error(error);
        }
    }
    user.set("avatar", media[0]);
    const result: TUser = await user.save();
    res.json({
        success: true,
        message: "Avatar uploaded successfully.",
        data: result,
    });
}


/**
 * Update password.
 * @access Current authenticated user.
 * PATCH /api/users/current-user/password/
 */
export async function updatePassword (req: Request, res: Response): Promise<void> {
    const { oldPassword, newPassword } = req.body as updatePasswordReqBodyType;
    const user: TUser | null = await UserModel.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }
    const isPasswordCorrect: boolean = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        res.status(401);
        throw new Error("Invalid current password!");
    }
    user.set({ password: newPassword });
    await user.save();
    res.json({
        success: true,
        message: "Password updated successfully!",
    });
}


/**
 * Delete the current user.
 * @access Any authenticated user.
 * DELETE /api/users/current-user/
 */
export async function deleteUser (req: Request, res: Response): Promise<void> {
    const { user } = req;
    if (user.avatar) {
        try {
            await destroyFromCloudinary(user.avatar.publicId);
        } catch (error) {
            console.error(error);
        }
    }
    const deletedUser: DeleteResult = await user.deleteOne();
    if (!deletedUser.deletedCount) {
        res.status(404);
        throw new Error("The user you were trying to delete was not found.");
    }
    res.json({
        success: true,
        message: "User account deleted successfully.",
    });
}


// ~ ADDRESSES 

/**
 * Get all addresses.
 * @access Current authenticated user.
 * Get /api/users/current-user/addresses/
 */
export async function getMyAddresses (req: Request, res: Response): Promise<void> {
    const { user } = req;
    const addresses: TAddressLean[] = user.addresses;
    res.json({
        success: true,
        message: `${addresses.length} address${addresses.length === 1 ? "" : "es"} found.`,
        data: addresses,
    });
}


/**
 * Add a new address.
 * @access Current authenticated user.
 * POST /api/users/current-user/addresses
 */
export async function addNewAddress (req: Request, res: Response): Promise<void> {
    const { user, body } = req;
    const address: TAddress = new AddressModel(body);
    user.addresses.unshift(address);
    await user.save();
    res.json({
        success: true,
        message: "Address added successfully!",
    });
}


/**
 * Delete address by id.
 * @access Current authenticated user.
 * DELETE /api/users/current-user/addresses/:addressId
 */
export async function deleteMyAddress (req: Request, res: Response): Promise<void> {
    const { user, params } = req;
    const addressExists: TAddress | undefined = user.addresses.find((address: TAddress): boolean => address._id.toString() === params.addressId);
    if (!addressExists) {
        res.status(404);
        throw new Error("Address not found!");
    }
    user.addresses = user.addresses.filter((address: TAddress): boolean => {
        return address._id.toString() !== req.params.addressId;
    });
    await user.save();
    res.json({
        success: true,
        message: "Address deleted successfully!",
    });
}


/**
 * Update address by id.
 * @access Any authenticated user.
 * PATCH /api/users/current-user/addresses/:addressId
 */
export async function updateMyAddress (req: Request, res: Response): Promise<void> {
    const { user, params, body } = req;
    const address: TAddress | undefined = user.addresses.find((address: TAddress): boolean => address.id === params.addressId);
    if (!address) {
        res.status(404);
        throw new Error("Address not found!");
    }
    address.set(body);
    await address.save();
    const updatedUser = await user.save();
    res.json({
        success: true,
        message: "Address updated successfully.",
        data: updatedUser.addresses,
    });
}


// ~ CART 

/**
 * Get user's cart.
 * @access Any authenticated user.
 * GET /api/users/current-user/cart/
 */
export async function getCart (req: Request, res: Response): Promise<void> {
    const { user } = req;
    const cartItems: Array<TCartItemLean> = user.cartItems;
    res.json({
        success: true,
        message: `${cartItems.length} cart item(s) found.`,
        data: cartItems,
    });
}


/**
 * Add item to user's cart.
 * @access Any authenticated user.
 * POST /api/users/current-user/cart/
 */
export async function addToCart (req: Request, res: Response): Promise<void> {
    const { user, body } = req;
    const cartItem: TCartItem = new CartItemModel(body);
    user.cartItems.push(cartItem);
    const result: TUser = await user.save();
    res.json({
        success: true,
        message: "Item added to cart.",
        data: result.cartItems,
    });
}


/**
 * Update cart item quantity.
 * @access Any authenticated user.
 * PATCH /api/users/current-user/cart/:cartItemId/
 */
export async function updateCartItemQuantity (req: Request, res: Response): Promise<void> {
    const { user, body, params } = req;
    const cartItem: TCartItem | undefined = user.cartItems.find((item: TCartItem): boolean => item.id === params.cartItemId);
    if (!cartItem) {
        res.status(404);
        throw new Error("Cart item not found.");
    }
    cartItem.set("quantity", body.quantity);
    const result: TUser = await user.save();
    res.json({
        success: true,
        message: "Item quantity updated..",
        data: result.cartItems,
    });
}


/**
 * Remove item from the cart.
 * @access Any authenticated user.
 * DELETE /api/users/current-user/cart/:cartItemId/
 */
export async function removeItemFromCart (req: Request, res: Response): Promise<void> {
    const { user, params } = req;
    const cartItems: Array<TCartItem> = user.cartItems.filter((item: TCartItem): boolean => item.id !== params.cartItemId);
    user.set({ cartItems });
    const result: TUser = await user.save();
    res.json({
        success: true,
        message: "Item removed from cart.",
        data: result.cartItems,
    });
}


/**
 * Clear the cart.
 * @access Any authenticated user.
 * DELETE /api/users/current-user/cart/
 */
export async function clearCart (req: Request, res: Response): Promise<void> {
    const { user } = req;
    user.set({ cartItems: [] });
    const result: TUser = await user.save();
    res.json({
        success: true,
        message: "Cart cleared successfully.",
        data: result.cartItems,
    });
}