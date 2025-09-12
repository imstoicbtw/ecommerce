import { CheckCircleIcon } from "@heroicons/react/24/solid/index";
import type { IMediaRawDoc } from "common/src/mongoose/media.types.ts";
import { type RefObject, type SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetMediaQuery } from "../../redux/query/mediaApiSlice.ts";
import { Button } from "../Button.tsx";


type Props = {
    trigger: RefObject<HTMLButtonElement | HTMLDivElement | null>;
    mediaState: string[];
    setMediaState: React.Dispatch<SetStateAction<string[]>>;
    limit?: number;
};

export default function MediaSelector({ trigger, mediaState, setMediaState, limit = Infinity }: Props) {

    const { currentData: media } = useGetMediaQuery({ size: 1000 });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
    const location = useLocation();

    const openDialog = (): void => {
        document.body.style.overflow = "hidden";
        setIsOpen(true);
    };

    const closeDialog = (): void => {
        document.body.style.overflow = "auto";
        setIsOpen(false);
    };

    const handleSubmit = async () => {
        setMediaState([...new Set([...selectedMedia])]);
        closeDialog();
    };

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        setSelectedMedia([...mediaState]);
    }, [mediaState]);

    useEffect(() => {
        trigger.current?.addEventListener("click", openDialog);
        return (): void => trigger.current?.removeEventListener("click", openDialog);
    }, [trigger]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent): void => {
            if (event.key === "Escape") closeDialog();
        };
        document.addEventListener("keydown", handleEscape);
        return (): void => document.removeEventListener("keydown", handleEscape);
    }, [closeDialog]);

    if (!isOpen) return null;

    return (
        <div className={"h-screen w-screen grid place-items-center fixed inset-0 z-[9997] before:absolute before:inset-0 before:bg-slate-900 before:opacity-50"}>
            <div className={"z-[9998] flex flex-col gap-5 w-11/12 lg:w-4/5 max-h-max p-5 rounded-2xl bg-white"}>
                <h2 className={"text-xl font-semibold border-b-2 border-b-slate-300 pb-3"}>Select Media</h2>
                <div className="flex-grow h-[500px] max-h-[60vh] overflow-y-auto">
                    <div className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"}>
                        {
                            [...media.data].reverse().map(({ _id: id, url, name }: IMediaRawDoc & { _id: string; }) => (
                                <div
                                    key={id}
                                    className={`relative cursor-pointer rounded-xl overflow-hidden border-4 ${selectedMedia.includes(id) ? "border-blue-500" : "border-transparent"}`}
                                    onClick={() => {
                                        if (selectedMedia.includes(id)) {
                                            const newSelectedMedia = selectedMedia.filter(item => item !== id);
                                            setSelectedMedia(newSelectedMedia);
                                            return;
                                        } else if (limit && selectedMedia.length >= limit) return;
                                        setSelectedMedia([...selectedMedia, id]);
                                    }}
                                >
                                    {selectedMedia.includes(id) && (
                                        <div className={"absolute top-0 right-0 pb-1 pl-1 rounded-bl-2xl bg-blue-500 flex items-center justify-center"}>
                                            <CheckCircleIcon className={"w-6 h-6 text-white"} />
                                        </div>
                                    )}
                                    <img
                                        src={url}
                                        alt={name}
                                        className={"w-full h-full aspect-square object-cover"}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={"flex gap-2 justify-end"}>
                    <Button variant={"secondary"} onClick={() => closeDialog()}>Cancel</Button>
                    <Button onClick={handleSubmit}>Select</Button>
                </div>
            </div>
        </div>
    );
}