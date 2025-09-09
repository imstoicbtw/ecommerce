import { CheckCircleIcon } from "@heroicons/react/24/solid/index";
import { Outlet } from "react-router-dom";
import AdminHeader, { type AdminHeaderContent } from "../../components/Admin/AdminHeader";


export default function AdminOrdersLayout () {

    const content: AdminHeaderContent = {
        action: {
            label: "Ready to Ship",
            to: "/dashboard/orders/pending",
            icon: CheckCircleIcon,
        },
        navigation: [
            {
                label: "Delivered Orders",
                to: "/dashboard/orders/delivered",
            },
            {
                label: "Cancelled Orders",
                to: "/dashboard/orders/cancelled",
            },
            {
                label: "Refunded Orders",
                to: "/dashboard/orders/refunded",
            },
        ],
    };

    return (
        <div className={"grid gap-5"}>
            <AdminHeader headerContent={content} />
            <Outlet />
        </div>
    );
}