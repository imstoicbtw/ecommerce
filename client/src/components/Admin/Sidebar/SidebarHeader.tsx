import { Link } from "react-router-dom";


export const SidebarHeader = () => {
    return (
        <div className={"flex flex justify-center h-10"}>
            <Link to={"/"}>
                <img src={"/logo.jpg"} className={"object-contain h-full w-full"} alt="Shophour logo." />
            </Link>
        </div>
    );
};