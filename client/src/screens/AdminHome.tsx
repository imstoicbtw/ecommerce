import { CloudArrowDownIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline/index";
import { useState } from "react";
import { Button } from "../components/Button.tsx";


export default function AdminHome () {
    const [ loading, setLoading ] = useState<boolean>(false);
    return (
        <div className={"flex gap-2"}>
            Admin Home
            <Button icon={PencilSquareIcon} loading={loading} variant={"primary"} onClick={() => setLoading(!loading)}>Button</Button>
            <Button icon={CloudArrowDownIcon} loading={loading} variant={"secondary"} onClick={() => setLoading(!loading)}>Button</Button>
            <Button icon={PlusIcon} loading={loading} variant={"success"} onClick={() => setLoading(!loading)}>Button</Button>
            <Button icon={TrashIcon} loading={loading} variant={"destructive"} onClick={() => setLoading(!loading)}>Button</Button>
        </div>
    );
}