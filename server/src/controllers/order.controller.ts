import type { TOrder, TOrderItem, TOrderLean } from "common/dist/mongoose/order.types.js";
import { Request, Response } from "express";
import { createOrderReqBodyType, updateOrderStatusReqBodyType } from "../../../common/dist/zod/requests/order.zod.js";
import { OrderModel } from "../models/order.model.js";
import { OrderItemModel } from "../models/subdocs/order-item.model.js";


/**
 * Get all orders.
 * @access [admin, manager]
 * GET /api/orders/
 */
export async function getAllOrders (req: Request, res: Response): Promise<void> {
    const { page = 1, size = 8, keyword } = req.query;
    const searchQuery = keyword
        ? {
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        } : {};

    const count = await OrderModel.countDocuments({ ...searchQuery });
    const orders: TOrder[] = await OrderModel
        .find({ ...searchQuery })
        .limit(+size)
        .skip((+page - 1) * +size);

    res.json({
        success: true,
        message: `${orders.length} order(s) found.`,
        meta: {
            pageCount: Math.ceil(count / +size),
            page: +page,
            size: +size,
        },
        data: orders,
    });
}


/**
 * Get orders by status.
 * @access [admin, manager]
 * GET /api/orders/status/:status/
 */
export async function getOrdersByStatus (req: Request, res: Response): Promise<void> {
    const { status } = req.params;
    const { page = 1, size = 8 } = req.query;
    const count = await OrderModel.countDocuments({ status });
    const orders: TOrder[] = await OrderModel
        .find({ status })
        .limit(+size)
        .skip((+page - 1) * +size);
    res.json({
        success: true,
        message: `${orders.length} order(s) found.`,
        meta: {
            pageCount: Math.ceil(count / +size),
            page: +page,
            size: +size,
        },
        data: orders,
    });
}


/**
 * Create a new order.
 * @access Any authenticated user.
 * POST /api/orders/
 */
export async function createOrder (req: Request, res: Response): Promise<void> {
    const { products, ...body } = req.body as createOrderReqBodyType;
    const { user } = req;
    const productDocs: Array<TOrderItem> = products.map((item): TOrderItem => new OrderItemModel(item));
    const order: TOrder = new OrderModel({ ...body, products: productDocs, user: user._id });
    const result = await order.save();
    res.json({
        success: true,
        message: "Order created successfully.",
        data: result,
    });
}


/**
 * Get all orders of the current user.
 * @access Any authenticated user.
 * GET /api/orders/current-user/
 */
export async function getMyOrders (req: Request, res: Response): Promise<void> {
    const { user } = req;

    const orders: TOrder[] = await OrderModel.find({ user: user.id });

    res.json({
        success: true,
        message: `${orders.length} order(s) found.`,
        data: orders,
    });
}


/**
 * Get order of the current user by id.
 * @access Any authenticated user.
 * GET /api/orders/current-user/:orderId/
 */
export async function getMyOrderById (req: Request, res: Response): Promise<void> {
    const { user, params } = req;
    const order: TOrder | null = await OrderModel.findById(params.orderId).populate([ "payment" ]);
    if (!order) {
        res.status(404);
        throw new Error("Order not found.");
    } else if (order.user.toString() !== user.id) {
        res.status(401);
        throw new Error("You are not allowed to access this order.");
    }
    res.json({
        success: true,
        message: "Order fetched successfully.",
        data: order,
    });

}


/**
 * Get order by id.
 * @access [admin].
 * GET /api/orders/:orderId/
 */
export async function getOrderById (req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const order: TOrder | null = await OrderModel.findById(orderId).populate([
        { path: "user", select: "name email avatar" },
        { path: "payment" },
        { path: "products.product", select: "thumbnail name", populate: { path: "thumbnail", select: "url" } },
    ]);
    if (!order) {
        res.status(404);
        throw new Error("Order not found.");
    }
    res.json({
        success: true,
        message: "Order fetched successfully.",
        data: order,
    });
}


/**
 * Update order status.
 * @access [admin, manager]
 * PATCH /api/orders/:orderId/update/
 */
export async function updateOrderStatus (req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const { status, payment }: updateOrderStatusReqBodyType = req.body;
    const order: TOrder | null = await OrderModel.findById(orderId);
    if (!order) {
        res.status(404);
        throw new Error("Order not found.");
    }
    order.set({ "status": status, payment: order.payment ?? payment });
    const result: TOrder = await order.save();
    res.json({
        success: true,
        message: "Order status updated successfully.",
        data: result,
    });
}


/**
 * Cancel order.
 * @access Any authenticated user.
 * PATCH /api/orders/:orderId/cancel/
 */
// TODO: Implement cancellation policy.
export async function cancelOrder (req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const { user } = req;
    const order: TOrder | null = await OrderModel.findById(orderId);
    if (!order) {
        res.status(404);
        throw new Error("Order not found.");
    } else if (order.user.toString() !== user.id) {
        res.status(401);
        throw new Error("You're not allowed to cancel this order!");
    } else if (order.status !== "delivered") {
        res.status(400);
        throw new Error("Order already delivered.");
    }
    order.set("status", "cancelled");
    const result: TOrder = await order.save();
    res.json({
        success: true,
        message: "Order cancelled successfully.",
        data: result,
    });
}