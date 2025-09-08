import type { RouteObject } from "react-router-dom";
import { OpenLayout } from "../layouts/OpenLayout/index.tsx";
import { AboutUs } from "../screens/open/AboutUs.tsx";
import { Cart } from "../screens/open/Cart.tsx";
import { CategoryArchives } from "../screens/open/CategoryArchives.tsx";
import { ContactUs } from "../screens/open/ContactUs.tsx";
import { Home } from "../screens/open/Home.tsx";
import { PrivacyPolicy } from "../screens/open/PrivacyPolicy.tsx";
import { ProductPage } from "../screens/open/ProductPage.tsx";
import { Sale } from "../screens/open/Sale.tsx";
import { Search } from "../screens/open/Search.tsx";
import { TermsAndConditions } from "../screens/open/TermsAndConditions.tsx";


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
        {
            path: "sale",
            Component: Sale,
        },
        {
            path: "about",
            Component: AboutUs,
        },
        {
            path: "contact",
            Component: ContactUs,
        },
        {
            path: "privacy-policy",
            Component: PrivacyPolicy,
        },
        {
            path: "terms-of-service",
            Component: TermsAndConditions,
        },
    ],
};