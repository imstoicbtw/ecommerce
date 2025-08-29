import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify/unstyled";
import store from "./redux/store.ts";
import { AdminRouter } from "./routes/admin.routes.ts";
import { AuthRouter } from "./routes/auth.routes.ts";


const router = createBrowserRouter([ AuthRouter, AdminRouter ]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
            <ToastContainer />
        </Provider>
    </StrictMode>,
);
