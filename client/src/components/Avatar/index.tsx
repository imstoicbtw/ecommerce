import { UserIcon } from "@heroicons/react/24/outline/index";
import type { ComponentProps } from "react";
import AvatarContainer from "./AvatarContainer.tsx";


type CoreProps = {
    size?: "small" | "medium" | "large" | "huge";
    fallback?: string;
};
type ImageProps = {} & CoreProps & ComponentProps<"img">;
type FallBackProps = {} & CoreProps & ComponentProps<"div">;
type Props = ImageProps | FallBackProps;

export default function Avatar ({ size, className, ...props }: Props) {
    if ("src" in props && props.src) {
        return (
            <AvatarContainer size={size} className={className}>
                <img {...props} className={"w-full h-full object-cover"} />
            </AvatarContainer>
        );
    } else if ("fallback" in props) {
        const { fallback, ...restProps } = props;
        return (
            <AvatarContainer size={size} className={className}>
                <span {...restProps} className={"uppercase"}>{fallback?.trim()[0]}</span>
            </AvatarContainer>
        );
    } else {
        const iconSizes: Record<string, string> = { small: "w-4 h-4", medium: "w-6 h-6", large: "w-8 h-8" };
        return (
            <AvatarContainer size={size} className={className}>
                <UserIcon className={iconSizes[size || "medium"]} />
            </AvatarContainer>
        );
    }
}