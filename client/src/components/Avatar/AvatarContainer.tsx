import type { ComponentProps } from "react";


type Size = "small" | "medium" | "large";

type Props = {
    size?: Size;
} & ComponentProps<"div">;

const sizes: Record<Size, string> = {
    small: "w-8 h-8 text-base",
    medium: "w-10 h-10 text-lg",
    large: "w-12 h-12 text-xl",
};

const cn = ({ size, className }: { size: Size, className?: string }): string => {
    const coreClasses: string = "rounded-full overflow-hidden bg-blue-500 text-white grid place-items-center font-semibold leading-none select-none";
    return `${coreClasses} ${sizes[size]} ${className ?? ""}`.trim();
};

export default function AvatarContainer ({ size = "medium", className, children, ...props }: Props) {
    return (
        <div className={cn({ size, className })} {...props}>
            {children}
        </div>
    );
}