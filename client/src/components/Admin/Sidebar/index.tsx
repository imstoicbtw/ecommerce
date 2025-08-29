import type { ComponentPropsWithRef } from "react";
import SidebarBody from "./SidebarBody.tsx";
import SidebarFooter from "./SidebarFooter.tsx";
import { SidebarHeader } from "./SidebarHeader.tsx";


type Props = {} & ComponentPropsWithRef<"aside">;

export default function ({className, ...props}: Props) {
    return (
        <aside
            className={`h-screen sticky top-0 w-2xs p-3 flex flex-col gap-5 border-r-2 border-r-slate-200 ${className ?? ""}`}
            {...props}
        >
            <SidebarHeader />
            <SidebarBody />
            <SidebarFooter name={"Sufiyan Mulla"} email={"sufiyanmulla@gmail.com"} />
        </aside>
    );
}