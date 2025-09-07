import { ArrowPathIcon } from "@heroicons/react/24/solid/index";
import type { ComponentProps, ForwardRefExoticComponent, PropsWithoutRef, SVGProps } from "react";
import { NavLink, type To } from "react-router-dom";


type Variant = "success" | "destructive" | "ghost" | "secondary" | "primary" | "plain";
type Size = "small" | "medium" | "large";
type States = Record<string, boolean | undefined>;
type CoreProps = {
    variant?: Variant;
    loading?: boolean;
    disabled?: boolean;
    size?: Size;
    icon?: ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>>>;
};
type ButtonProps = {
    to?: never;
} & CoreProps & ComponentProps<"button">;
type LinkProps = {
    to: To;
} & CoreProps & Omit<ComponentProps<"a">, "href">;
type Props = ButtonProps | LinkProps;

const coreClasses: string = "rounded-lg transition-all flex items-center justify-center gap-1";
const sizeClasses: Record<Size, string> = {
    small: "px-2 py-1 text-sm [&_svg]:w-4 [&_svg]:h-4 [&_svg]:mb-px",
    medium: "px-3 py-1.5 text-base [&_svg]:w-4 [&_svg]:h-4",
    large: "px-3 py-1.5 text-lg [&_svg]:w-5 [&_svg]:h-5",
};
const defaultStateClasses = "cursor-pointer active:scale-98";
const stateClasses: Record<string, string> = {
    loading: "pointer-events-none select-none opacity-80",
    disabled: "pointer-events-none !bg-slate-200 !text-slate-400 select-none",
};
const variantClasses: Record<Variant, string> = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-700",
    success: "bg-green-600 hover:bg-green-700 text-white",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
    ghost: "text-slate-700 hover:bg-slate-200 hover:text-slate-800",
    plain: "text-slate-700 active:!scale-100",
};

const cn = ({
    states, variant, size, className,
}: {
    states: States,
    variant: Variant,
    size: Size,
    className?: string,
}): string => {
    const classes: Array<string> = [];
    classes.push(coreClasses, variantClasses[variant], sizeClasses[size]);
    if (Object.values(states).every((state: boolean | undefined): boolean => !state)) {
        classes.push(defaultStateClasses);
    } else {
        for (const state in states) {
            if (states[state]) classes.push(stateClasses[state]);
        }
    }
    classes.push(className ?? "");
    return classes.join(" ").trim();
};

export function Button ({
    children,
    className,
    variant = "primary",
    size = "medium",
    loading,
    disabled,
    icon: Icon,
    ...props
}: Props) {
    const classes: string = cn({ states: { loading, disabled }, variant, size, className });
    if ("to" in props && props.to) {
        type RestProps = Omit<LinkProps, keyof CoreProps | "to">;
        const { to, ...restProps } = props;
        return (
            <NavLink
                className={({ isActive }) => `${classes} ${isActive && variant === "ghost" && "bg-slate-200 text-slate-800"}`}
                to={to}
                title={disabled ? "Not allowed." : undefined}
                {...restProps as RestProps}>
                {Icon && <Icon className={"size-4"} />}
                <span>{children}</span>
            </NavLink>
        );
    }
    type RestProps = Omit<ButtonProps, keyof CoreProps>;
    return (
        <button
            className={classes}
            title={disabled ? "Not allowed." : undefined}
            {...props as RestProps}>
            {loading && <ArrowPathIcon className={"animate-[spin_linear_600ms_infinite]"} />}
            {Icon && !loading && <Icon />}
            <span>{children}</span>
        </button>
    );
}