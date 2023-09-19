import { Badge, Flex } from "@chakra-ui/react";
import { tags } from "../utils/tags";
import { colorScheme } from "../utils/colorSchemes";

interface TagsCloudProps {
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export function TagsCloud({
    selectedTags,
    setSelectedTags,
}: TagsCloudProps): JSX.Element {
    function handleSelectTags(tag: string) {
        if (selectedTags.includes(tag)) {
            const newTags = selectedTags.filter((t) => t !== tag);
            setSelectedTags(newTags);
        } else {
            setSelectedTags((prev) => [...prev, tag]);
        }
    }

    return (
        <Flex justifyContent={"center"} flexWrap={"wrap"}>
            {tags.map((tag, index) => (
                <Badge
                    colorScheme={colorScheme[tag as keyof typeof colorScheme]}
                    key={index}
                    size={{ base: "xs", lg: "sm" }}
                    fontSize={{ base: "xs", lg: "sm" }}
                    margin={{ base: "0.2rem", lg: "0.5rem" }}
                    variant={selectedTags.includes(tag) ? "solid" : "outline"}
                    borderRadius={"9"}
                    textAlign={"center"}
                    onClick={() => handleSelectTags(tag)}
                    paddingBlock={"1vh"}
                    paddingInline={"1vw"}
                >
                    {tag}
                </Badge>
            ))}
            <Badge
                size={{ base: "sm", lg: "md" }}
                fontSize={{ base: "xs", lg: "md" }}
                margin={{ base: "0.2rem", lg: "0.5rem" }}
                padding={"0.5vh"}
                borderRadius={"9"}
                onClick={() => setSelectedTags([])}
                paddingBlock={"1vh"}
                paddingInline={"1vw"}
            >
                Clear Tags
            </Badge>
        </Flex>
    );
}
