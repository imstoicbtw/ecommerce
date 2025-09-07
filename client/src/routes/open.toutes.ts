import type { RouteObject } from "react-router-dom";
import { OpenLayout } from "../layouts/OpenLayout/index.tsx";
import { Cart } from "../screens/open/Cart.tsx";
import { CategoryArchives } from "../screens/open/CategoryArchives.tsx";
import { Home } from "../screens/open/Home.tsx";
import { ProductPage } from "../screens/open/ProductPage.tsx";
import { Search } from "../screens/open/Search.tsx";


export const OpenRouter: RouteObject = {
    path: "",
    Component: OpenLayout,
    children: [
        {
            path: "",
            Component: Home,
        },
        {
            path: "product/:productId",
            Component: ProductPage,
        },
        {
            path: "product-category/:categorySlug",
            Component: CategoryArchives,
        },
        {
            path: "search",
            Component: Search,
        },
        {
            path: "cart",
            Component: Cart,
        },
    ],
};