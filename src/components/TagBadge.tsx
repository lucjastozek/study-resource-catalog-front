import { Badge } from "@chakra-ui/react";
import { colorScheme } from "../utils/colorSchemes";
import { TagI } from "../interface/Tag";

interface TagBadgeProps {
    tag: TagI;
}

export function TagBadge({ tag }: TagBadgeProps): JSX.Element {
    return (
        <Badge
            colorScheme={colorScheme[tag.name as keyof typeof colorScheme]}
            fontSize={{ base: "xs", lg: "sm" }}
            size={{ base: "xs", lg: "sm" }}
            margin={{ base: "0.2rem", lg: "0.5rem" }}
            variant={"solid"}
            borderRadius={"9"}
            paddingTop={{ base: "0.5vh", lg: "0.75vh" }}
            paddingBottom={{ base: "0.5vh", lg: "0.75vh" }}
            paddingInline={{ base: "1vh", lg: "1.5vh" }}
        >
            {tag.name}
        </Badge>
    );
}
