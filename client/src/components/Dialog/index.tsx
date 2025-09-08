import { type ComponentProps, type ReactNode, type RefObject, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import { Button } from "../Button.tsx";
import DialogBody from "./DialogBody.tsx";
import DialogFooter from "./DialogFooter.tsx";
import DialogHeader from "./DialogHeader.tsx";


type Props = {
    trigger: RefObject<HTMLButtonElement | null>;
    heading: ReactNode;
    submitAction?: () => Promise<{ success: boolean, message: string }>;
    submitLabel?: string;
    onClose?: () => void;
    loading?: boolean;
} & ComponentProps<"div">;

export default function Dialog ({ trigger, heading, submitLabel, submitAction, children, className, onClose, loading = false, ...props }: Props) {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const isLoadingRef = useRef<boolean>(isLoading);
    const location = useLocation();

    const openDialog = (): void => {
        document.body.style.overflow = "hidden";
        setIsOpen(true);
    };

    const closeDialog = (forceClose?: true): void => {
        if (onClose) onClose();
        if (isLoadingRef.current && !forceClose) return;
        document.body.style.overflow = "auto";
        setIsOpen(false);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if (submitAction) {
                const { success, message } = await submitAction();
                if (!success) throw new Error(message);
                toast.success(message);
            }
            closeDialog(true);
        } catch (error: any) {
            toast.error(error.message || "An unknown error has occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(loading);
    }, [ loading ]);

    useEffect(() => {
        setIsOpen(false);
    }, [ location ]);

    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [ isLoading ]);

    useEffect(() => {
        trigger.current?.addEventListener("click", openDialog);
        return (): void => trigger.current?.removeEventListener("click", openDialog);
    }, [ trigger ]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent): void => {
            if (event.key === "Escape") closeDialog();
        };
        document.addEventListener("keydown", handleEscape);
        return (): void => document.removeEventListener("keydown", handleEscape);
    }, [ closeDialog ]);

    if (!isOpen) return null;

    const containerClasses: string = `z-[9998] grid gap-3 max-h-[90vh] min-w-md max-w-lg p-5 rounded-2xl bg-white overflow-auto ${className ?? ""}`;

    return (
        <div className={"grid place-items-center fixed inset-0 z-[9997] before:absolute before:inset-0 before:bg-slate-900 before:opacity-50"}>
            <div className={containerClasses} {...props}>
                <DialogHeader>{heading}</DialogHeader>
                <DialogBody className={"py-3"}>{children}</DialogBody>
                <DialogFooter>
                    <Button disabled={isLoading} variant={"secondary"} onClick={() => closeDialog()}>Cancel</Button>
                    <Button loading={isLoading} onClick={handleSubmit}>{submitLabel ?? "Save"}</Button>
                </DialogFooter>
            </div>
        </div>
    );
}