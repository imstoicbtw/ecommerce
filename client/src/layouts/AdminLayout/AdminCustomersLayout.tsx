import { Outlet } from "react-router-dom";
import AdminHeader, { type AdminHeaderContent } from "../../components/Admin/AdminHeader";


const content: AdminHeaderContent = {
    navigation: [
        {
            label: "Inactive Customers",
            to: "/dashboard/customers/inactive",
        },
    ],
};

export default function AdminCustomersLayout () {
    return (
        <div className={"grid gap-5"}>
            <AdminHeader
                headerContent={content}
            />
            <Outlet />
        </div>
    );
}