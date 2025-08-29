import type { ComponentProps } from "react";


type Props = {} & ComponentProps<"div">;

export default function ({children, ...props}: Props) {
    return (
        <div className={"text-lg font-bold"} {...props}>
            {children}
        </div>
    );
}