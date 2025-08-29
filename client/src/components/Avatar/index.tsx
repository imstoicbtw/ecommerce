import { UserIcon } from "@heroicons/react/24/outline/index";
import type { ComponentProps } from "react";
import AvatarContainer from "./AvatarContainer.tsx";


type CoreProps = {
    size?: "small" | "medium" | "large";
    fallback?: string;
};
type ImageProps = {} & CoreProps & ComponentProps<"img">;
type FallBackProps = {} & CoreProps & ComponentProps<"div">;
type Props = ImageProps | FallBackProps;

export default function Avatar ({ size, ...props }: Props) {
    if ("src" in props && props.src) {
        return (
            <AvatarContainer size={size}>
                <img {...props} className={"w-full h-full object-cover"} />
            </AvatarContainer>
        );
    } else if ("fallback" in props) {
        const { fallback, ...restProps } = props;
        return (
            <AvatarContainer size={size}>
                <span {...restProps} className={"uppercase"}>{fallback?.trim()[0]}</span>
            </AvatarContainer>
        );
    } else {
        return (
            <AvatarContainer size={size}>
                <UserIcon className={"w-6 h-6"}/>
            </AvatarContainer>
        );
    }
}