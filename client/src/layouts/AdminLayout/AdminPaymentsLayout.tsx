import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline/index";
import { Outlet } from "react-router-dom";
import AdminHeader, { type AdminHeaderContent } from "../../components/Admin/AdminHeader/";


const content: AdminHeaderContent = {
    action: {
        label: "Razorpay",
        to: "https://dashboard.razorpay.com/",
        icon: ArrowTopRightOnSquareIcon,
        target: "_blank",
    },
    navigation: [
        {
            label: "All Payments",
            to: "/dashboard/payments/all",
        },
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

    const handleSearch = (): void => {
        console.log("Search");
    };

    return (
        <div className={"grid gap-5"}>
            <AdminHeader
                headerContent={content}
                searchHandler={handleSearch}
                searchLabel={"Search Payment"}
                searchPlaceholder={"Search payment by order id."}
            />
            <Outlet />
        </div>
    );
}