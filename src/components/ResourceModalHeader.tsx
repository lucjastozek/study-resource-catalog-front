import {
    Avatar,
    Badge,
    Box,
    Flex,
    Heading,
    Image,
    ModalHeader,
    Skeleton,
    Tag,
    Text,
} from "@chakra-ui/react";
import { colorScheme } from "../utils/colorSchemes";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";

interface ResourceModalHeaderProps {
    username: string;
    tagColor: string;
    resource: Resource;
    tags: TagI[];
    imageLink: string | null;
}

export function ResourceModalHeader({
    username,
    tagColor,
    resource,
    tags,
    imageLink,
}: ResourceModalHeaderProps): JSX.Element {
    return (
        <ModalHeader>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={username} src={`./${username}-avatar.png`} />

                <Box>
                    <Heading size="sm">{username}</Heading>
                    <Tag colorScheme={tagColor} textTransform={"capitalize"}>
                        {resource.recommendation_type}
                    </Tag>
                </Box>
            </Flex>
            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                marginBottom={"2vh"}
                marginTop={"2vh"}
                flexWrap={"wrap"}
            >
                {tags.map((tag, index) => (
                    <Badge
                        colorScheme={
                            colorScheme[tag.name as keyof typeof colorScheme]
                        }
                        key={index}
                        fontSize={{ base: "xs", lg: "sm" }}
                        size={{ base: "xs", lg: "sm" }}
                        margin={{ base: "0.25rem", lg: "0.5rem" }}
                        variant={"solid"}
                        paddingTop={{ base: "0.5vh", lg: "0.75vh" }}
                        paddingBottom={{ base: "0.5vh", lg: "0.75vh" }}
                        paddingInline={{ base: "1vh", lg: "1.5vh" }}
                        borderRadius={"9"}
                    >
                        {tag.name}
                    </Badge>
                ))}
            </Flex>
            <a href={resource.url} target="_blank" rel="noreferrer">
                {imageLink ? (
                    <Image
                        src={imageLink}
                        alt=""
                        height={"13.5vh"}
                        width={"24vh"}
                        objectFit={"cover"}
                        margin={"auto"}
                    />
                ) : (
                    <Skeleton
                        height={"13.5vh"}
                        width={"24vh"}
                        margin={"auto"}
                    />
                )}
            </a>

            <Text fontWeight={"800"} textAlign={"center"} marginTop={"2vh"}>
                {resource.name}
            </Text>
        </ModalHeader>
    );
}
