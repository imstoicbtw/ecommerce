import type { ComponentPropsWithRef } from "react";
import { useSelector } from "react-redux";
import type { Store } from "../../../redux/store.ts";
import SidebarBody from "./SidebarBody.tsx";
import SidebarFooter from "./SidebarFooter.tsx";
import { SidebarHeader } from "./SidebarHeader.tsx";


type Props = {} & ComponentPropsWithRef<"aside">;

export default function Sidebar ({ className, ...props }: Props) {
    const isSidebarOpen = useSelector((state: Store) => state.settings.adminSidebar);
    return (
        <aside
            className={`h-screen fixed lg:sticky top-0 left-0 w-2xs p-3 flex flex-col gap-5 border-r-2 border-r-slate-200 z-[9997] bg-white shadow-black/50 shadow-2xl lg:shadow-none ${className ?? ""}`}
            style={{ left: isSidebarOpen ? 0 : "-100%", transition: "left 0.25s ease" }}
            {...props}
        >
            <SidebarHeader />
            <SidebarBody />
            <SidebarFooter />
        </aside>
    );
}