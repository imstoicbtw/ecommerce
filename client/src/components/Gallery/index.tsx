import type { IMediaRawDoc } from "common/dist/mongoose/media.types.ts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


type Props = {
    gallery: Array<IMediaRawDoc & { _id: string }>;
}

export default function Gallery ({ gallery }: Props) {
    const location = useLocation();
    const [ activeImage, setActiveImage ] = useState<IMediaRawDoc & { _id: string }>(gallery[0]);

    useEffect(() => {
        setActiveImage(gallery[0]);
    }, [ location ]);

    return (
        <div className={"flex gap-3 flex-row-reverse justify-between align-start aspect-square "}>
            <div className={"basis-[95%] h-full grow"}>
                <img src={activeImage.url} alt={activeImage.name} className={"w-full h-full border border-slate-300 object-contain rounded-xl sm:rounded-3xl"} />
            </div>
            <div className={"scrollbar-hidden flex flex-col grid-cols-1 gap-2 w-1/5 overflow-y-auto"}>
                {gallery.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={image.name}
                        className={`block border-4 aspect-square object-cover rounded-xl sm:rounded-3xl cursor-pointer ${activeImage._id === image._id ? "border-blue-500" : "border-transparent"}`} onMouseEnter={() => setActiveImage(image)}
                    />
                ))}
            </div>
        </div>
    );
}