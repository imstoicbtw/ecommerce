type Props = {
    message?: string;
};

export function Loader ({ message }: Props) {
    return (
        <div className={"fixed inset-0 flex flex-col items-center justify-center bg-white z-[999999] text-blue-500"}>
            <div className={"size-10 border-2 rounded-full border-t-transparent animate-[spin_400ms_linear_infinite]"} />
            <p className={"mt-2"}>{message || "Something amazing is loading..."}</p>
        </div>
    );
}