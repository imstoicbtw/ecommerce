import type { ComponentProps } from "react";


type Props = {
    name: string;
    label?: string;
    description?: string;
    containerClassName?: string;
} & ComponentProps<"select">;

export function SelectInput ({ name, children, className, containerClassName, label, description, ...props }: Props) {
    return (
        <div className={`flex flex-col gap-1.5 w-full ${containerClassName ?? ""}`}>
            <label htmlFor={name} className={"flex flex-col gap-1 w-full"}>
                {label && <p className={"font-semibold leading-3 mb-1"}>{label}</p>}
                <select
                    className={`!border-2 border-slate-300 text-slate-600 hover:border-blue-500 focus:border-blue-500 hover:text-blue-500 focus:text-blue-600 focus:bg-blue-50 rounded-lg px-2 py-1 outline-none ${className ?? ""}`}
                    name={name}
                    id={name}
                    {...props}
                >
                    {children}
                </select>
                {description && <p className={"text-xs text-slate-500"}>{description}</p>}
            </label>
        </div>
    );
}