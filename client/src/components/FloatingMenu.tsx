import { type ComponentPropsWithRef, type RefObject, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";


type Float = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type Props = {
    float: Float;
    trigger: RefObject<HTMLDivElement | null>;
} & ComponentPropsWithRef<"div">;

const floats: Record<Float, string> = {
    "top-left": "bottom-full mb-2 left-0",
    "top-right": "bottom-full mb-2 right-0",
    "bottom-left": "top-full mb-2 left-0",
    "bottom-right": "top-full mb-2 right-0",
};

const cn = ({className, float}: {className?: string; float: Float}): string => {
    return `absolute min-w-40 bg-white rounded-lg p-2 shadow border-2 border-slate-200 "flex flex-col gap-1 *:flex *:items-center *:px-2 *:py-1 *:rounded-md *:cursor-pointer *:gap-1 ${floats[float]} ${className ?? ""}`;
};

export default function FloatingMenu ({children, className, float, trigger}: Props) {

    const [ isFloatingMenuOpen, setIsFloatingMenuOpen ] = useState<boolean>(false);
    const floatingMenuRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        setIsFloatingMenuOpen(false);
    }, [ location ]);

    useEffect(() => {
        const triggerCopy = trigger.current;
        const handleFloatingMenu = () => {
            const state = true;
            setIsFloatingMenuOpen(state);
        };
        trigger.current?.addEventListener("click", handleFloatingMenu);
        return () => triggerCopy?.removeEventListener("click", handleFloatingMenu);
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent): void => {
            if (floatingMenuRef.current && !floatingMenuRef.current.contains(event.target as Element) && !trigger.current?.contains(event.target as Element)) {
                const state = false;
                setIsFloatingMenuOpen(state);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    if (!isFloatingMenuOpen) return null;

    return (
        <div ref={floatingMenuRef} className={cn({className, float})}>
            {children}
        </div>
    );

}