import type { ComponentProps, ForwardRefExoticComponent, PropsWithoutRef, SVGProps } from "react";
import { NavLink, type NavLinkRenderProps } from "react-router-dom";


type Props = {
    icon: ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>>>;
    to: string;
} & Omit<ComponentProps<"a">, "href">;

const cn = ({isActive}: NavLinkRenderProps): string => {
    return `flex items-center gap-2 p-3 rounded-lg ${isActive ? "text-blue-600 bg-blue-50" : "hover:text-blue-600 hover:bg-blue-50"}`;
};

export default function ({icon: Icon, children, ...props}: Props) {
    return (
        <li className={"list-none"}>
            <NavLink className={cn} {...props}>
                <Icon className={"w-5 mb-0.5"} />
                <span>
                {children}
                </span>
            </NavLink>
        </li>
    );
}