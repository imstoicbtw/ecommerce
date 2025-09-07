import type { RouteObject } from "react-router-dom";
import AuthLayout from "../layouts/OpenLayout/AuthLayout.tsx";
import { Login } from "../screens/auth/Login.tsx";
import { Register } from "../screens/auth/Register.tsx";


export const AuthRouter: RouteObject = {
    path: "auth",
    Component: AuthLayout,
    children: [
        {
            path: "login",
            Component: Login,
        },
        {
            path: "register",
            Component: Register,
        },
    ],
};