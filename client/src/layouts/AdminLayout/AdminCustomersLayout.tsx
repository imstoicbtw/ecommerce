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

    const handleSearch = (): void => {
        console.log("Search");
    };

    return (
        <div className={"grid gap-5"}>
            <AdminHeader
                headerContent={content}
                searchHandler={handleSearch}
                searchLabel={"Search Customer"}
                searchPlaceholder={"Search customer by name or email."}
            />
            <Outlet />
        </div>
    );
}