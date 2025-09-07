import { Router } from "express";
import { userRoles } from "../../../common/dist/constants.js";
import {
    createProduct,
    deleteProduct,
    deleteReview,
    editReview, getInactiveProducts,
    getProductById,
    getProductReviews,
    getProducts, getProductsOnSale,
    submitReview,
    updateProduct,
    updateProductProperty,
} from "../controllers/product.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate-body.middleware.js";
import { createProductReqBody, updateProductPropertyReqBody } from "../../../common/dist/zod/requests/product.zod.js";


export const productRouter: Router = Router();

productRouter.route("/")
             .get(getProducts)
             .post(
                 authenticate,
                 authorize(userRoles.Admin, userRoles.Manager),
                 validateBody(createProductReqBody),
                 createProduct,
             );

productRouter.route("/on-sale")
             .get(getProductsOnSale);

productRouter.route("/inactive")
             .get(
                 authenticate,
                 authorize(userRoles.Admin, userRoles.Manager),
                 getInactiveProducts,
             );

productRouter.route("/:productId")
             .get(getProductById)
             .put(
                 authenticate,
                 authorize(userRoles.Admin, userRoles.Manager),
                 validateBody(createProductReqBody.partial()),
                 updateProduct,
             )
             .delete(
                 authenticate,
                 authorize(userRoles.Admin, userRoles.Manager),
                 deleteProduct,
             )
             .patch(
                 authenticate,
                 authorize(userRoles.Admin, userRoles.Manager),
                 validateBody(updateProductPropertyReqBody),
                 updateProductProperty,
             );


// Reviews

productRouter.route("/:productId/reviews/")
             .get(getProductReviews)
             .post(
                 authenticate,
                 submitReview,
             );


productRouter.route("/:productId/reviews/:reviewId")
             .delete(
                 authenticate,
                 authorize(userRoles.Admin, userRoles.Manager),
                 deleteReview,
             )
             .patch(
                 authenticate,
                 editReview,
             );