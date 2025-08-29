import { ChevronUpIcon } from "@heroicons/react/16/solid/index";
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, QuestionMarkCircleIcon, UserIcon } from "@heroicons/react/24/outline/index";
import { type ComponentPropsWithRef, type ForwardRefExoticComponent, type PropsWithoutRef, type SVGProps, useRef } from "react";
import { Link, type To, useNavigate } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import { useLogoutMutation } from "../../../redux/query/authApiSlice.ts";
import Avatar from "../../Avatar";
import FloatingMenu from "../../FloatingMenu";


type Props = {
    name: string;
    email: string;
} & ComponentPropsWithRef<"div">;


export default function SidebarFooter ({name, email}: Props) {

    const adminActionsMenuItems: {
        label: string;
        to: To;
        Icon: ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>>>;
    }[] = [
        {label: "Profile", to: "/account/profile", Icon: UserIcon},
        {label: "Settings", to: "/account/settings", Icon: Cog6ToothIcon},
        {label: "Help", to: "/account/help", Icon: QuestionMarkCircleIcon},
    ];

    const navigate = useNavigate();
    const userMenuRef = useRef<HTMLDivElement>(null);
    const [ logout ] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout(null).unwrap();
            navigate("/auth/login");
        } catch (error: any) {
            toast.error(error.data.message);
        }
    };

    return (
        <div className={"relative"}>
            <div
                ref={userMenuRef}
                className={"hover:bg-slate-200 flex justify-between items-center p-2 rounded-xl cursor-pointer"}
            >
                <div className={"flex gap-2 items-center"}>
                    <Avatar size={"large"} />
                    <div className="flex flex-col grow leading-5">
                        <p className={"font-semibold"}>{name}</p>
                        <p className={"text-xs"}>{email}</p>
                    </div>
                </div>
                <ChevronUpIcon className={"w-5"} />
            </div>
            <FloatingMenu trigger={userMenuRef} float={"top-left"}>
                {adminActionsMenuItems.map(({label, to, Icon}) => (
                    <Link key={"admin_actions_menu_to_" + to} to={to} className={"hover:bg-blue-50 hover:text-blue-600"}>
                        <Icon className={"size-4"} />
                        <span>{label}</span>
                    </Link>
                ))}
                <div className={"text-red-500 hover:bg-red-50 hover:text-red-600"} onClick={handleLogout}>
                    <ArrowLeftStartOnRectangleIcon className={"size-4 rotate-180"} />
                    Logout
                </div>
            </FloatingMenu>
        </div>
    );
}