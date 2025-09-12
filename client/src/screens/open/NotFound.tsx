import { HomeIcon } from "@heroicons/react/20/solid/index";
import { Button } from "../../components/Button.tsx";


export function NotFound () {
    return (
        <main className={"fixed h-screen w-screen grid place-items-center"}>
            <div className={"flex flex-col items-center"}>
                <h1 className={"text-9xl font-black text-blue-500"}>404</h1>
                <h2 className={"text-2xl font-bold"}>Oops! You're at the wrong place.</h2>
                <p className={"text-center mb-5"}>The link you followed maybe broken or the page does not exist.</p>
                <Button icon={HomeIcon} to={"/"}>Go Home &rarr;</Button>
            </div>
        </main>
    );
}