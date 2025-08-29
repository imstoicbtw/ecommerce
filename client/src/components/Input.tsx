import type { ComponentProps } from "react";


type Props = {
    name: string;
    label?: string;
    description?: string;
    containerClassName?: string;
} & ComponentProps<"input">;


export function Input ({ className, name, label, description, containerClassName, ...props }: Props) {
    return (
        <div className={`flex flex-col gap-1.5 w-full ${containerClassName ?? ""}`}>
            <label htmlFor={name} className={"flex flex-col gap-1 w-full"}>
                {label && <p className={"font-semibold leading-3 mb-1"}>{label}</p>}
                <input
                    className={`!border-2 border-slate-300 text-slate-600 hover:border-blue-500 focus:border-blue-500 hover:text-blue-500 focus:text-blue-600 focus:bg-blue-50 rounded-lg px-2 py-1 outline-none ${className ?? ""}`}
                    name={name}
                    id={name}
                    {...props}
                />
                {description && <p className={"text-xs text-slate-500"}>{description}</p>}
            </label>
        </div>
    );
}