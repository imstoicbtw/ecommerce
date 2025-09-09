import { XMarkIcon } from "@heroicons/react/24/solid/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";


export const SidebarHeader = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "settings/closeSidebar" });
    }, [ location, dispatch ]);

    return (
        <div className={"flex justify-between lg:justify-center h-10"}>
            <Link to={"/"}>
                <img src={"/logo.jpg"} className={"object-contain h-full w-full"} alt="Shophour logo." />
            </Link>
            <button
                className={"text-xl font-black self-center bg-red-500 text-white rounded-full p-2 cursor-pointer lg:hidden"}
                onClick={() => dispatch({ type: "settings/closeSidebar" })}
            >
                <XMarkIcon className={"size-5"} />
            </button>
        </div>
    );
};