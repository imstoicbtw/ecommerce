import type { ComponentProps } from "react";


type Props = {} & ComponentProps<"div">;

export default function ({children, ...props}: Props) {
    return (
        <div>
            <div className={"flex justify-end items-center gap-1"} {...props}>
                {children}
            </div>
        </div>
    );
}