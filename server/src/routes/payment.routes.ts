import { userRoles } from "common/dist/index.js";
import { Router } from "express";
import { createPayment, getAllPayments, getPaymentById, getPaypalClientId } from "../controllers/payment.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";


export const paymentRouter = Router();

paymentRouter.route("/")
             .get(authenticate, authorize(userRoles.Admin, userRoles.Manager), getAllPayments)
             .post(authenticate, createPayment);

paymentRouter.route("/paypal")
             .get(authenticate, getPaypalClientId);

paymentRouter.route("/:paymentId")
             .get(authenticate, getPaymentById);
