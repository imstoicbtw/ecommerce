export const BASE_URL = "/api";
export const AUTH_URL = "/auth";
export const PRODUCTS_URL = "/products";
export const USERS_URL = "/users";
export const ORDERS_URL = "/orders";
export const PAYMENTS_URL = "/payments";
export const MEDIA_URL = "/media";
export const CATEGORIES_URL = "/categories";


export const userRoles = {
    Admin: "admin",
    Customer: "customer",
    Manager: "manager",
} as const;
export type UserRole = typeof userRoles[keyof typeof userRoles];


export const orderStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
] as const;
export type OrderStatus = typeof orderStatuses[number];


export const paymentStatuses = [
    "pending",
    "completed",
    "failed",
] as const;
export type PaymentStatus = typeof paymentStatuses[number];


export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;