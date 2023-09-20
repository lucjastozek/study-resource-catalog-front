import {
    Avatar,
    Box,
    CardHeader,
    Flex,
    Heading,
    Image,
    Skeleton,
    Tag,
    Text,
} from "@chakra-ui/react";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { tagScheme } from "../utils/tagScheme";
import { TagBadge } from "./TagBadge";

interface ResourceCardHeaderProps {
    resource: Resource;
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
    usernames: {
        [key: number]: string;
    };
    linkPreviews: { [key: number]: string };
    tags: TagI[];
}

export function ResourceCardHeader({
    resource,
    setSelectedResource,
    usernames,
    linkPreviews,

    tags,
}: ResourceCardHeaderProps): JSX.Element {
    const imageURL =
        linkPreviews[resource.resource_id] === "no image found"
            ? `https://fallback-image-api.onrender.com/?text=${resource.name}`
            : linkPreviews[resource.resource_id];
    return (
        <CardHeader
            onClick={() => {
                setSelectedResource(resource);
            }}
            marginBottom={"0"}
            mb={"-5"}
        >
            <Flex
                flex="1"
                gap="4"
                alignItems="center"
                flexWrap="wrap"
                marginBottom={"2vh"}
            >
                <Avatar
                    name={usernames[resource.user_id]}
                    src={`./${usernames[resource.user_id]}-avatar.png`}
                />

                <Box mb={1}>
                    <Heading size="sm" mb={2} mt={1}>
                        {usernames[resource.user_id]}
                    </Heading>
                    <Tag
                        colorScheme={
                            tagScheme[
                                resource.recommendation_type as keyof typeof tagScheme
                            ]
                        }
                        textTransform={"capitalize"}
                    >
                        {resource.recommendation_type}
                    </Tag>
                </Box>
            </Flex>
            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                mb="2"
                flexWrap={"wrap"}
            >
                {tags !== undefined &&
                    tags
                        .slice(0, 3)
                        .map((tag, index) => (
                            <TagBadge key={index} tag={tag} />
                        ))}
            </Flex>
            <a href={resource.url} target="_blank" rel="noreferrer">
                {resource.resource_id in linkPreviews ? (
                    <Image
                        src={imageURL}
                        alt=""
                        width={"90%"}
                        aspectRatio={16 / 9}
                        objectFit={"cover"}
                        margin={"auto"}
                    />
                ) : (
                    <Skeleton
                        width={"90%"}
                        aspectRatio={16 / 9}
                        margin={"auto"}
                    />
                )}
            </a>

            <Text fontWeight={"800"} textAlign={"center"} mt={5}>
                {resource.name}
            </Text>
        </CardHeader>
    );
}
