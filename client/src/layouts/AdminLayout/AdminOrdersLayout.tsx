import { Outlet } from "react-router-dom";
import AdminHeader, { type AdminHeaderContent } from "../../components/Admin/AdminHeader";


export default function AdminOrdersLayout () {

    const content: AdminHeaderContent = {
        navigation: [
            {
                label: "All Orders",
                to: "/dashboard/orders/all",
            },
            {
                label: "Pending Orders",
                to: "/dashboard/orders/pending",
            },
            {
                label: "Completed Orders",
                to: "/dashboard/orders/completed",
            },
            {
                label: "Cancelled Orders",
                to: "/dashboard/orders/cancelled",
            },
            {
                label: "Returned Orders",
                to: "/dashboard/orders/returned",
            },
        ],
    };

    const handleSearch = (): void => {
        console.log("Search");
    };

    return (
        <div className={"grid gap-5"}>
            <AdminHeader
                headerContent={content}
                searchHandler={handleSearch}
                searchLabel={"Search Order"}
                searchPlaceholder={"Search order by order id, phone number, or pin code."}
            />
            <Outlet />
        </div>
    );
}