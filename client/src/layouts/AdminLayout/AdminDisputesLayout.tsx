import { Outlet } from "react-router-dom";
import AdminHeader, { type AdminHeaderContent } from "../../components/Admin/AdminHeader";


const content: AdminHeaderContent = {
    navigation: [
        {
            label: "Open Disputes",
            to: "/dashboard/disputes/open",
        },
        {
            label: "Closed Disputes",
            to: "/dashboard/disputes/closed",
        },
    ],
};

export default function AdminDisputesLayout () {
    return (
        <div className={"grid gap-5"}>
            <AdminHeader
                headerContent={content}
            />
            <Outlet />
        </div>
    );
}