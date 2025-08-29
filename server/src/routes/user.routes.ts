import { Router } from "express";
import { userRoles } from "../../../common/dist/constants.js";
import {
    addNewAddress,
    addToCart,
    clearCart,
    deleteMyAddress,
    deleteUser,
    getCart,
    getCurrentUser,
    getCustomers,
    getManagers,
    getMyAddresses,
    getUserById,
    removeItemFromCart,
    updateCartItemQuantity,
    updateCurrentUserAvatar,
    updateCurrentUserDetails,
    updateMyAddress,
    updatePassword,
    updateUserRole,
    updateUserStatus,
} from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate-body.middleware.js";
import {
    addNewAddressReqBody,
    addToCartReqBody, updateCartItemQuantityReqBody,
    updatePasswordReqBody,
    updateUserRoleReqBody,
} from "../../../common/dist/zod/requests/user.zod.js";
import { multerImage } from "../middlewares/multer.middleware.js";
import { cloudinarySingleUpload } from "../middlewares/cloudinary.middleware.js";


export const userRouter: Router = Router();


// ~ USER 
userRouter.route("/current-user")
          .get(authenticate, getCurrentUser)
          .patch(authenticate, updateCurrentUserDetails)
          .delete(authenticate, deleteUser);

userRouter.route("/current-user/avatar")
          .patch(
              authenticate,
              multerImage.single("avatar"),
              cloudinarySingleUpload,
              updateCurrentUserAvatar,
          );

userRouter.route("/current-user/password")
          .patch(
              authenticate,
              validateBody(updatePasswordReqBody),
              updatePassword,
          );


// ~ ADDRESSES 
userRouter.route("/current-user/addresses")
          .get(authenticate, getMyAddresses)
          .post(authenticate, validateBody(addNewAddressReqBody), addNewAddress);

userRouter.route("/current-user/addresses/:addressId")
          .patch(authenticate, validateBody(addNewAddressReqBody.partial()), updateMyAddress)
          .delete(authenticate, deleteMyAddress);


// ~ CART 

userRouter.route("/current-user/cart")
          .get(authenticate, getCart)
          .post(authenticate, validateBody(addToCartReqBody), addToCart)
          .delete(authenticate, clearCart);

userRouter.route("/current-user/cart/:cartItemId")
          .patch(authenticate, validateBody(updateCartItemQuantityReqBody), updateCartItemQuantity)
          .delete(authenticate, removeItemFromCart);


// ~ ADMIN ROUTES 

userRouter.route("/customers")
          .get(
              authenticate,
              authorize(userRoles.Admin, userRoles.Manager),
              getCustomers,
          );

userRouter.route("/managers")
          .get(
              authenticate,
              authorize(userRoles.Admin),
              getManagers,
          );

userRouter.route("/user/:userId")
          .get(
              authenticate,
              authorize(userRoles.Admin, userRoles.Manager),
              getUserById,
          );

userRouter.route("/user/:userId/role")
          .patch(
              authenticate,
              authorize(userRoles.Admin),
              validateBody(updateUserRoleReqBody),
              updateUserRole,
          );

userRouter.route("/user/:userId/status")
          .patch(
              authenticate,
              authorize(userRoles.Admin),
              updateUserStatus,
          );