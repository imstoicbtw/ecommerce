import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline/index";
import { Outlet } from "react-router-dom";
import AdminHeader, { type AdminHeaderContent } from "../../components/Admin/AdminHeader/";


const content: AdminHeaderContent = {
    action: {
        label: "Paypal",
        to: "https://business.paypal.com/",
        icon: ArrowTopRightOnSquareIcon,
        target: "_blank",
    },
    navigation: [
        {
            label: "Successful Payments",
            to: "/dashboard/payments/successful",
        },
        {
            label: "Failed Payments",
            to: "/dashboard/payments/failed",
        },
    ],
};

export default function AdminPaymentsLayout () {
    return (
        <div className={"grid gap-5"}>
            <AdminHeader
                headerContent={content}
            />
            <Outlet />
        </div>
    );
}