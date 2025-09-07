import { type RouteObject } from "react-router-dom";
import { PrivateLayout } from "../layouts/PrivateLayout/index.tsx";
import { Checkout } from "../screens/private/Checkout.tsx";
import { PayOrder } from "../screens/private/PayOrder";
import { Profile } from "../screens/private/Profile.tsx";
import { Shipping } from "../screens/private/Shipping.tsx";


export const PrivateRouter: RouteObject = {
    path: "account",
    Component: PrivateLayout,
    children: [
        {
            path: "shipping",
            Component: Shipping,
        },
        {
            path: "checkout",
            Component: Checkout,
        },
        {
            path: "pay/:orderId",
            Component: PayOrder,
        },
        {
            path: "profile",
            Component: Profile,
        },
    ],
};