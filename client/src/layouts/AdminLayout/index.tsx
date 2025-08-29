import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar/index.tsx";


export default function AdminLayout () {
    return (
        <div className={"flex"}>
            <Sidebar />
            <div className={"flex-1 p-6"}>
                <Outlet />
            </div>
        </div>
    );
}