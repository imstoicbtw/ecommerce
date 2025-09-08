import { Router } from "express";
import { userRoles } from "../../../common/dist/constants.js";
import {
    cancelOrder,
    createOrder,
    getAllOrders,
    getMyOrderById, getMyOrders,
    getOrderById, getOrdersByStatus,
    updateOrderStatus,
} from "../controllers/order.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate-body.middleware.js";
import { createOrderReqBody, updateOrderStatusReqBody } from "../../../common/dist/zod/requests/order.zod.js";


export const orderRouter = Router();


orderRouter.route("/")
           .get(
               authenticate,
               authorize(userRoles.Admin, userRoles.Manager),
               getAllOrders,
           )
           .post(
               authenticate,
               validateBody(createOrderReqBody),
               createOrder,
           );

orderRouter.route("/status/:status")
           .get(
               authenticate,
               authorize(userRoles.Admin, userRoles.Manager),
               getOrdersByStatus,
           );

orderRouter.route("/current-user")
           .get(
               authenticate,
               getMyOrders,
           );

orderRouter.route("/current-user/:orderId")
           .get(
               authenticate,
               getMyOrderById,
           );


orderRouter.route("/:orderId")
           .get(
               authenticate,
               authorize(userRoles.Admin, userRoles.Manager),
               getOrderById,
           );


orderRouter.route("/:orderId/update")
           .patch(
               authenticate,
               validateBody(updateOrderStatusReqBody),
               updateOrderStatus,
           );


orderRouter.route("/:orderId/cancel")
           .patch(
               authenticate,
               cancelOrder,
           );