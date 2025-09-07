import { AdminRouter } from "./routes/admin.routes.ts";
import { AuthRouter } from "./routes/auth.routes.ts";
import { OpenRouter } from "./routes/open.toutes.ts";
import { PrivateRouter } from "./routes/private.routes.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify/unstyled";


const router = createBrowserRouter([ OpenRouter, AuthRouter, AdminRouter, PrivateRouter ]);

export default function App () {
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    );
}