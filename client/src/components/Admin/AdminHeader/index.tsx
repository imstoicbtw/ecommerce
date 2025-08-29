import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid/index";
import { type ComponentProps, type ForwardRefExoticComponent, type HTMLAttributeAnchorTarget, type PropsWithoutRef, type RefObject, type SVGProps, useState } from "react";
import { Button } from "../../Button.tsx";
import SearchThisModule from "./SearchThisModule.tsx";


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

type SearchProps = {
    headerContent: AdminHeaderContent;
    searchHandler: () => void;
    searchLabel: string,
    searchPlaceholder: string,
} & ComponentProps<"nav">;

type NoSearchProps = {
    headerContent: AdminHeaderContent;
    searchHandler?: never;
} & ComponentProps<"nav">;

type Props = SearchProps | NoSearchProps;

export default function AdminHeader ({className, headerContent, ...props}: Props) {
    const {action} = headerContent;
    const [ search, setSearch ] = useState<boolean>(false);

    const getSearchIcon = (): HeroIcon => {
        if (search) return XMarkIcon;
        return MagnifyingGlassIcon;
    };

    const handleSearch = () => setSearch(!search);

    return (
        <header>
            {/*<h2 className={"text-xl font-bold mb-4"}>{heading}</h2>*/}
            {search && "searchHandler" in props && "searchPlaceholder" in props && (
                <SearchThisModule
                    searchHandler={props.searchHandler}
                    searchPlaceholder={props.searchPlaceholder}
                />
            )}
            <nav className={`flex gap-3 justify-start items-center ${className}`}>
                {action && (
                    <>
                        {"to" in action
                            ? <Button icon={action.icon} to={action.to} target={action.target}>{action.label}</Button>
                            : <Button icon={action.icon} ref={action.trigger}>{action.label}</Button>
                        }
                    </>
                )}
                {"searchHandler" in props && "searchLabel" in props && (
                    <Button icon={getSearchIcon()} onClick={handleSearch} variant={action ? "secondary" : "primary"}>{props.searchLabel}</Button>
                )
                }
                {
                    !!headerContent.navigation?.length && (
                        <>
                            <span className={"w-px h-5 bg-slate-300"} />
                            <ul className={"flex gap-2"}>
                                {headerContent.navigation.map(({label, to}) => (
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