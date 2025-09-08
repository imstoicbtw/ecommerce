import type { RouteObject } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminCategoriesLayout from "../layouts/AdminLayout/AdminCategoriesLayout.tsx";
import AdminCustomersLayout from "../layouts/AdminLayout/AdminCustomersLayout.tsx";
import AdminDisputesLayout from "../layouts/AdminLayout/AdminDisputesLayout.tsx";
import AdminMediaLayout from "../layouts/AdminLayout/AdminMediaLayout.tsx";
import AdminOrdersLayout from "../layouts/AdminLayout/AdminOrdersLayout.tsx";
import AdminPaymentsLayout from "../layouts/AdminLayout/AdminPaymentsLayout.tsx";
import AdminProductsLayout from "../layouts/AdminLayout/AdminProductsLayout.tsx";
import { AllCategories } from "../screens/admin/AdminCategories";
import { AllCustomers, InactiveCustomers } from "../screens/admin/AdminCustomers";
import { AllDisputes, ClosedDisputes, OpenDisputes } from "../screens/admin/AdminDisputes/";
import { AllMedia } from "../screens/admin/AdminMedia";
import { AllOrders, CancelledOrders, DeliveredOrders, ReadyToShipOrders, RefundedOrders } from "../screens/admin/AdminOrders";
import { OrderView } from "../screens/admin/AdminOrders/OrderView.tsx";
import { AllProducts, EditProduct, InactiveProducts, NewProduct, OnSaleProducts } from "../screens/admin/AdminProducts";
import AdminHome from "../screens/admin/AdminHome.tsx";
import { AllPayments, FailedPayments, SuccessfulPayments } from "../screens/admin/AdminPayments";


export const AdminRouter: RouteObject = {
    "path": "dashboard",
    Component: AdminLayout,
    children: [
        {
            path: "home",
            Component: AdminHome,
        },
        {
            path: "orders",
            Component: AdminOrdersLayout,
            children: [
                {
                    path: "",
                    Component: AllOrders,
                },
                {
                    path: "pending",
                    Component: ReadyToShipOrders,
                },
                {
                    path: "delivered",
                    Component: DeliveredOrders,
                },
                {
                    path: "cancelled",
                    Component: CancelledOrders,
                },
                {
                    path: "refunded",
                    Component: RefundedOrders,
                },
                {
                    path: "order/:orderId",
                    Component: OrderView,
                },
            ],
        },
        {
            path: "payments",
            Component: AdminPaymentsLayout,
            children: [
                {
                    path: "",
                    Component: AllPayments,
                },
                {
                    path: "successful",
                    Component: SuccessfulPayments,
                },
                {
                    path: "failed",
                    Component: FailedPayments,
                },
            ],
        },
        {
            path: "products",
            Component: AdminProductsLayout,
            children: [
                {
                    path: "",
                    Component: AllProducts,
                },
                {
                    path: "new",
                    Component: NewProduct,
                },
                {
                    path: "edit/:productId",
                    Component: EditProduct,
                },
                {
                    path: "on-sale",
                    Component: OnSaleProducts,
                },
                {
                    path: "inactive",
                    Component: InactiveProducts,
                },
            ],
        },
        {
            path: "categories",
            Component: AdminCategoriesLayout,
            children: [
                {
                    path: "",
                    Component: AllCategories,
                },
            ],
        },
        {
            path: "customers",
            Component: AdminCustomersLayout,
            children: [
                {
                    path: "",
                    Component: AllCustomers,
                },
                {
                    path: "inactive",
                    Component: InactiveCustomers,
                },
            ],
        },
        {
            path: "disputes",
            Component: AdminDisputesLayout,
            children: [
                {
                    path: "",
                    Component: AllDisputes,
                },
                {
                    path: "open",
                    Component: OpenDisputes,
                },
                {
                    path: "closed",
                    Component: ClosedDisputes,
                },
            ],
        },
        {
            path: "media",
            Component: AdminMediaLayout,
            children: [
                {
                    path: "",
                    Component: AllMedia,
                },
            ],
        },
    ],
};