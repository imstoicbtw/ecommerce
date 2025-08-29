import type { ComponentProps } from "react";


type Props = {
    serious?: boolean;
    name: string;
    label?: string;
    description?: string;
    containerClassName?: string;
} & Omit<ComponentProps<"input">, "type">;

export function ToggleInput ({
    serious,
    name,
    label,
    description,
    containerClassName,
    ...props
}: Props) {
    return (
        <div className={`flex flex-col gap-1.5 max-w-max ${containerClassName ?? ""}`}>
            <label htmlFor={name} className="flex items-center gap-2 cursor-pointer">
                {label && <span className="font-semibold">{label}</span>}
                <input
                    id={name}
                    name={name}
                    type="checkbox"
                    className={`peer hidden`}
                    {...props}
                />
                <div
                    className={`w-8 h-5 flex items-center rounded-full p-1 transition 
          peer-checked:bg-blue-500 peer-checked:*:left-1/2 ${serious ? "bg-red-500" : "bg-slate-300"}`}
                >
                    <div className={`relative bg-white w-1/2 h-full rounded-full shadow-md transition`} />
                </div>

                {description && (
                    <p className="text-xs text-slate-500 ml-12">{description}</p>
                )}
            </label>
        </div>
    );
}
