import { PhotoIcon, ArchiveBoxIcon, CurrencyRupeeIcon, ExclamationCircleIcon, HomeIcon, Squares2X2Icon, TagIcon, UserGroupIcon } from "@heroicons/react/24/solid/index";
import { type ForwardRefExoticComponent, type PropsWithoutRef, type ReactNode, type SVGProps } from "react";
import MenuItem from "../MenuItem.tsx";


type MenuItemProps = {
    children: ReactNode;
    icon: ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>>>;
    to: string;
}

const menuItems: Record<string, MenuItemProps> = {
    home: {
        children: "Dashboard",
        icon: HomeIcon,
        to: "/dashboard/home/",
    },
    orders: {
        children: "Orders",
        icon: ArchiveBoxIcon,
        to: "/dashboard/orders/",
    },
    payments: {
        children: "Payments",
        icon: CurrencyRupeeIcon,
        to: "/dashboard/payments/",
    },
    products: {
        children: "Products",
        icon: Squares2X2Icon,
        to: "/dashboard/products/",
    },
    categories: {
        children: "Categories",
        icon: TagIcon,
        to: "/dashboard/categories/",
    },
    customers: {
        children: "Customers",
        icon: UserGroupIcon,
        to: "/dashboard/customers/",
    },
    media: {
        children: "Media",
        icon: PhotoIcon,
        to: "/dashboard/media/",
    },
    disputes: {
        children: "Disputes",
        icon: ExclamationCircleIcon,
        to: "/dashboard/disputes/",
    },
};

export default function SidebarBody () {

    return (
        <div className={"flex flex-col gap-5 grow h-screen overflow-auto"}>
            <ul className={"flex flex-col gap-2"}>
                {Object.keys(menuItems).map((item) => {
                    const { children, icon, to } = menuItems[item];
                    const id: string = "sidebar_menu_item_" + item;
                    return <MenuItem key={id} id={id} icon={icon} to={to}>{children}</MenuItem>;
                })}
            </ul>
        </div>
    );

}