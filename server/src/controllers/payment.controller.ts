import type { Request, Response } from "express";
import * as process from "node:process";
import { PaymentModel } from "../models/payment.model.js";


export function getPaypalClientId (req: Request, res: Response) {
    res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
}


/**
 * Get all payments.
 * @access [admin, manager]
 * GET /api/payments/
 */
export async function getAllPayments (req: Request, res: Response) {
    const { page = 1, size = 8 } = req.query;
    const count = await PaymentModel.countDocuments();
    const payments = await PaymentModel
        .find()
        .limit(+size)
        .skip((+page - 1) * +size)
        .populate([
            { path: "user", select: "name email" },
        ]);

    res.json({
        success: true,
        message: `${payments.length} payment(s) found.`,
        meta: {
            pageCount: Math.ceil(count / +size),
            page: +page,
            size: +size,
        },
        data: payments,
    });
}


/**
 * Get payments by status.
 * @access [admin, manager]
 * GET /api/payments/
 */
export async function getPaymentsByStatus (req: Request, res: Response) {
    const { status } = req.params;
    const { page = 1, size = 8 } = req.query;
    const count = await PaymentModel.countDocuments();
    const payments = await PaymentModel
        .find({ status })
        .limit(+size)
        .skip((+page - 1) * +size)
        .populate([
            { path: "user", select: "name email" },
        ]);

    res.json({
        success: true,
        message: `${payments.length} payment(s) found.`,
        meta: {
            pageCount: Math.ceil(count / +size),
            page: +page,
            size: +size,
        },
        data: payments,
    });
}


/**
 * Get a payment by id.
 * @access [admin, manager]
 * GET /api/payments/:paymentId/
 */
export async function getPaymentById (req: Request, res: Response) {
    const { paymentId } = req.params;
    const payment = await PaymentModel.findById(paymentId).populate([
        { path: "user", select: "name email avatar" },
        { path: "order" },
    ]);
    if (!payment) throw new Error("Payment not found.");
    else if (payment.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("You are not allowed to access this payment.");
    }
    res.json({
        success: true,
        data: payment,
    });
}


/**
 * Create a new payment.
 * @access Any authenticated user.
 * POST /api/payments/
 */
export async function createPayment (req: Request, res: Response) {
    console.log(req.body);
    const payment = new PaymentModel({ ...req.body, user: req.user._id });
    const result = await payment.save();
    if (!result._id) throw new Error("Unable to process this payment. Contact support if any money has been deducted from your account.");
    res.json({
        success: true,
        message: "Payment successfully processed. Thank you for your purchase!.",
        data: result,
    });
}