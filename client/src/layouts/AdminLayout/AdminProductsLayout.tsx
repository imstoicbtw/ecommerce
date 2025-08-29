import { PlusIcon } from "@heroicons/react/24/outline/index";
import { Outlet } from "react-router-dom";
import AdminHeader, { type AdminHeaderContent } from "../../components/Admin/AdminHeader";


const content: AdminHeaderContent = {
    action: {
        label: "New Product",
        to: "/dashboard/products/new",
        icon: PlusIcon,
    },
    navigation: [
        {
            label: "On Sale Products",
            to: "/dashboard/products/on-sale",
        },
        {
            label: "Inactive Products",
            to: "/dashboard/products/inactive",
        },
    ],
};

export default function AdminProductsLayout () {

    const handleSearch = (): void => {
        console.log("Search");
    };

    return (
        <div className={"grid gap-5"}>
            <AdminHeader
                headerContent={content}
                searchHandler={handleSearch}
                searchLabel={"Search Product"}
                searchPlaceholder={"Search product by product id or name."}
            />
            <Outlet />
        </div>
    );
}