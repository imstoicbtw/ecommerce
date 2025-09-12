import { AdminRouter } from "./routes/admin.routes.ts";
import { AuthRouter } from "./routes/auth.routes.ts";
import { OpenRouter } from "./routes/open.toutes.ts";
import { PrivateRouter } from "./routes/private.routes.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify/unstyled";
import { Error } from "./screens/open/Error.tsx";
import { NotFound } from "./screens/open/NotFound.tsx";


const router = createBrowserRouter([
    OpenRouter,
    AuthRouter,
    AdminRouter,
    PrivateRouter,
    {
        path: "*",
        Component: NotFound,
        errorElement: <Error />,
    },
]);

export default function App () {
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    );
}