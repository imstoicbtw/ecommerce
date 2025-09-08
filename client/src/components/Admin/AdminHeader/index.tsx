import { type ComponentProps, type ForwardRefExoticComponent, type HTMLAttributeAnchorTarget, type PropsWithoutRef, type RefObject, type SVGProps } from "react";
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
    const { action } = headerContent;
    return (
        <header>
            <nav className={`flex gap-3 justify-start items-center ${className}`}>
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
                )
                }
            </nav>
        </header>
    );
}