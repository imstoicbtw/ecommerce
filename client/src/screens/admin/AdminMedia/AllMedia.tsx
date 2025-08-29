import { TrashIcon } from "@heroicons/react/24/outline/index";
import { toast } from "react-toastify/unstyled";
import type { IMediaRawDoc } from "../../../../../common/src/mongoose/media.types.ts";
import { Button } from "../../../components/Button.tsx";
import { useDeleteMediaMutation, useGetMediaQuery } from "../../../redux/query/mediaApiSlice.ts";
import type { MouseEvent } from "react";


export function AllMedia () {
    const { data, isLoading: queryLoading, error } = useGetMediaQuery(null);
    const [ deleteMedia, { isError, isLoading: mutationLoading } ] = useDeleteMediaMutation();

    const deleteMediaHandler = async (event: MouseEvent<HTMLButtonElement>, mediaId: string) => {
        const currentTarget = event.currentTarget;
        currentTarget.disabled = true;
        const response = await deleteMedia(mediaId);
        if (isError) toast.error("Something went wrong, please try again.");
        if (!response.data.success) toast.error(response.data.message);
        toast.success(response.data.message);
        currentTarget.parentElement?.remove();
    };

    if (queryLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {"message" in error ? error.message : "Something went wrong, please reload this page to try again."}</div>;
    if (!data.data.length) return <div>No media found, try uploading some.</div>;
    else return (
        <main>
            <p className={"italic text-red-500 mb-4"}>Any media items deleted from here will be then removed from everywhere.</p>
            <ul className={"grid grid-cols-4 gap-4"}>
                {
                    [ ...data.data ].reverse().map((media: IMediaRawDoc & { _id: string }) => (
                        <li
                            key={media._id}
                            className={"relative aspect-square flex items-start justify-end rounded-2xl overflow-hidden p-3"}
                        >
                            <img src={media.url} alt={media.name} className={"absolute -z-1 w-full h-full inset-0 object-cover"} />
                            <Button
                                variant={"destructive"}
                                icon={TrashIcon}
                                loading={mutationLoading}
                                onClick={(event) => deleteMediaHandler(event, media._id)}
                                className={"grid w-8 h-8 !rounded-full grid pt-2"}
                            />
                        </li>
                    ))
                }
            </ul>
        </main>
    );
}