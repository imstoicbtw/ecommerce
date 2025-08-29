import type { ComponentProps, FormEvent } from "react";


type Props = ComponentProps<"form"> & {
    searchHandler: () => void;
    searchPlaceholder: string;
};
export default function SearchThisModule ({searchHandler, searchPlaceholder, ...props}: Props) {
    const handleSearchSubmit = (event: FormEvent) => {
        event.preventDefault();
        searchHandler();
    };
    return (
        <form onSubmit={handleSearchSubmit} className={"pb-2 mb-4 border-b border-slate-300"} {...props}>
            <input type={"text"} placeholder={searchPlaceholder} className={"w-full outline-none"} autoFocus />
            <span className={"text-sm italic text-slate-600"}>Press enter to search.</span>
        </form>
    );
}