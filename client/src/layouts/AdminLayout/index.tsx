import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar/index.tsx";
import { useSelector } from "react-redux";
import type { Store } from "../../redux/store.ts";
import { Navigate } from "react-router-dom";


export default function AdminLayout () {
    const isAdmin = useSelector((state: Store) => state.user?.details?.role === "admin");
    if (!isAdmin) {
        alert("You are not authorized to access this page.");
        return <Navigate to={"/"} />;
    }
    return (
        <div className={"flex"}>
            <Sidebar />
            <div className={"flex-1 p-6"}>
                <Outlet />
            </div>
        </div>
    );
}