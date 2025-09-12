import { HomeIcon } from "@heroicons/react/20/solid/index";
import { Button } from "../../components/Button.tsx";


export function Error () {
    return (
        <main className={"fixed h-screen w-screen grid place-items-center"}>
            <div className={"flex flex-col items-center"}>
                <h1 className={"text-9xl font-black text-black text-red-600"}>Error</h1>
                <h2 className={"text-2xl font-bold"}>Oops! You found a bug.</h2>
                <p className={"text-center mb-5"}>There is a mistake in the code. Reload this page and contact if the error persists.</p>
                <Button icon={HomeIcon} to={"/"}>Go Home &rarr;</Button>
            </div>
        </main>
    );
}