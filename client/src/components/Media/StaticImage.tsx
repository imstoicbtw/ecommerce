import type { ComponentProps } from "react";


type Props = {} & ComponentProps<"img">


export function StaticImage (props: Props) {
    return (
        <img {...props} />
    );
}