import { CloudArrowUpIcon } from "@heroicons/react/24/outline/index";
import { useRef } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader, { type AdminHeaderContent } from "../../components/Admin/AdminHeader/";
import Dialog from "../../components/Dialog/index.tsx";
import { useUploadMediaMutation } from "../../redux/query/mediaApiSlice.ts";


export default function AdminMediaLayout () {

    const actionButtonRef = useRef<HTMLButtonElement | null>(null);
    const uploadMediaLabelRef = useRef<HTMLLabelElement | null>(null);
    const uploadMediaFormRef = useRef<HTMLFormElement | null>(null);
    const uploadedMediaRef = useRef<HTMLImageElement | null>(null);
    const uploadMediaInputRef = useRef<HTMLInputElement | null>(null);
    const [ uploadMedia ] = useUploadMediaMutation();

    const content: AdminHeaderContent = {
        action: {
            label: "Upload Media",
            icon: CloudArrowUpIcon,
            trigger: actionButtonRef,
        },
        navigation: [],
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            if (uploadMediaLabelRef.current) uploadMediaLabelRef.current.textContent = "Upload Media";
            if (uploadedMediaRef.current) uploadedMediaRef.current.classList.add("hidden");
            return;
        }
        ;
        if (uploadMediaLabelRef.current) uploadMediaLabelRef.current.textContent = file.name;
        if (uploadedMediaRef.current) {
            uploadedMediaRef.current.src = URL.createObjectURL(file);
            uploadedMediaRef.current.classList.remove("hidden");
        }
    };

    const handleFileSubmit = async (): Promise<{ success: boolean; message: string }> => {
        if (!uploadMediaInputRef.current?.files![0] || !uploadMediaFormRef.current) return { success: false, message: "Please select a file to upload." };
        const formData = new FormData(uploadMediaFormRef.current);
        const response = await uploadMedia(formData).unwrap() as { success: boolean, message: string };
        if (response.success) window.location.reload();
        return response;
    };

    return (
        <div className={"grid gap-5"}>
            <AdminHeader
                headerContent={content}
                searchHandler={() => console.log("Search")}
                searchPlaceholder={"Search for media items by file name"}
                searchLabel={"Search Media"}
            />
            <Outlet />
            <Dialog
                trigger={actionButtonRef}
                heading={"Upload Media"}
                submitLabel={"Upload"}
                submitAction={handleFileSubmit}
            >
                <form
                    className={"flex flex-col gap-4"}
                    ref={uploadMediaFormRef}
                >
                    <input type={"file"} hidden={true} id={"mediaImageUploadInput"} name={"image"} onChange={handleFileChange} accept={"image/*"} ref={uploadMediaInputRef} />
                    <label
                        ref={uploadMediaLabelRef}
                        htmlFor={"mediaImageUploadInput"}
                        className={"cursor-pointer border-2 border-dashed grid place-items-center text-slate-700 border-slate-300 rounded-lg h-20 hover:border-blue-500 hover:text-blue-600"}
                    >
                        Upload Media
                    </label>
                </form>
                <img ref={uploadedMediaRef} className={"w-full h-auto object-cover max-h-80 rounded-lg mt-5 hidden"} alt={"Uploaded Media"} />
            </Dialog>
        </div>
    );
}