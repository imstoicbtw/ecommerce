import { Bars2Icon } from "@heroicons/react/24/solid/index";
import { type ComponentProps, type ForwardRefExoticComponent, type HTMLAttributeAnchorTarget, type PropsWithoutRef, type RefObject, type SVGProps } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../Button.tsx";


type HeroIcon = ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>>>;

type Action = {
    label: string;
    icon?: HeroIcon;
}
type ActionButton = Action & {
    trigger: RefObject<HTMLButtonElement | null>;
}
type ActionLink = Action & {
    to: string;
    target?: HTMLAttributeAnchorTarget;
}
export type AdminHeaderContent = {
    action?: ActionButton | ActionLink;
    navigation?: Array<{
        label: string;
        to: string;
    }>;
}

type Props = {
    headerContent: AdminHeaderContent;
    searchHandler?: never;
} & ComponentProps<"nav">;

export default function AdminHeader ({ className, headerContent }: Props) {
    const dispatch = useDispatch();
    const { action } = headerContent;
    return (
        <header className={"**:whitespace-nowrap overflow-x-auto"}>
            <nav className={`flex gap-3 justify-start items-center !overflow-hidden ${className ?? ""}`}>
                <button
                    className={"text-xl font-black bg-blue-500 text-white rounded-full p-1.5 cursor-pointer lg:hidden"}
                    onClick={() => dispatch({ type: "settings/openSidebar" })}
                >
                    <Bars2Icon className={"size-6"} />
                </button>
                <div className={"overflow-x-auto"}>
                    <div className={"flex gap-3 items-center w-full"}>
                        {action && (
                            <>
                                {"to" in action
                                    ? <Button icon={action.icon} to={action.to} target={action.target}>{action.label}</Button>
                                    : <Button icon={action.icon} ref={action.trigger}>{action.label}</Button>
                                }
                            </>
                        )}
                        {!!headerContent.navigation?.length && (
                            <>
                                {action && <span className={"w-px h-5 bg-slate-300"} />}
                                <ul className={"flex gap-2"}>
                                    {headerContent.navigation.map(({ label, to }) => (
                                        <li key={label}>
                                            <Button to={to} variant={"ghost"} size={"small"}>{label}</Button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}