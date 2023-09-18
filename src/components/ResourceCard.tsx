import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    HStack,
    Heading,
    Image,
    Skeleton,
    Tag,
    Text,
    VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { Resource } from "../interface/Resource";
import { tagScheme } from "../utils/tagScheme";
import { handleDislike, handleLike } from "../utils/likeHandlers";
import { User } from "../interface/User";
import { handleDeleteFavourites } from "../utils/deleteHandlers";
import { useLocation } from "react-router-dom";
import { TagI } from "../interface/Tag";
import { colorSchemes } from "../utils/colorSchemes";

interface ResourceCardProps {
    resource: Resource;
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
    usernames: {
        [key: number]: string;
    };
    linkPreviews: { [key: number]: string };
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
    activeUser: User;
    tags: TagI[];
}

export function ResourceCard({
    resource,
    setSelectedResource,
    usernames,
    linkPreviews,
    setResources,
    setFavourites,
    activeUser,
    tags,
}: ResourceCardProps): JSX.Element {
    const location = useLocation();

    return (
        <Card key={resource.resource_id}>
            <CardHeader
                onClick={() => {
                    setSelectedResource(resource);
                }}
                marginBottom={"0"}
                mb={"-7"}
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

                    <Box mb={2}>
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
                <Flex justifyContent={"center"} alignItems={"center"}>
                    {tags !== undefined &&
                        tags.slice(0, 3).map((tag, index) => (
                            <Badge
                                colorScheme={
                                    colorSchemes[index % colorSchemes.length]
                                }
                                key={index}
                                fontSize={{ base: "sm", lg: "md" }}
                                margin={{ base: "0.2rem", lg: "0.5rem" }}
                                variant={"solid"}
                            >
                                {tag.name}
                            </Badge>
                        ))}
                </Flex>
                <a href={resource.url} target="_blank" rel="noreferrer">
                    {resource.resource_id in linkPreviews ? (
                        <Image
                            src={linkPreviews[resource.resource_id]}
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
            <CardBody
                onClick={() => {
                    setSelectedResource(resource);
                }}
            >
                <Text noOfLines={5}>{resource.description}</Text>
            </CardBody>
            <CardFooter alignItems={"end"} justify={"center"}>
                <VStack>
                    <HStack>
                        <Tag
                            cursor={"pointer"}
                            onClick={() =>
                                handleLike(
                                    resource.resource_id,
                                    setResources,
                                    setFavourites,
                                    activeUser.user_id
                                )
                            }
                            fontWeight={"bold"}
                            colorScheme="green"
                        >
                            {" "}
                            Likes:{" "}
                        </Tag>{" "}
                        <Text>{resource.likes}</Text>
                        <Tag
                            cursor={"pointer"}
                            onClick={() =>
                                handleDislike(
                                    resource.resource_id,
                                    setResources,
                                    setFavourites,
                                    activeUser.user_id
                                )
                            }
                            fontWeight={"bold"}
                            colorScheme="red"
                        >
                            {" "}
                            Dislikes:
                        </Tag>{" "}
                        <Text>{resource.dislikes}</Text>
                    </HStack>
                    <Text>
                        Submitted:{" "}
                        {moment(resource.creation_date).format("DD/MM/yyyy")}
                    </Text>

                    {location.pathname === "/study" && (
                        <Button
                            onClick={() =>
                                handleDeleteFavourites(
                                    resource.resource_id,
                                    setResources,
                                    setFavourites,
                                    activeUser.user_id
                                )
                            }
                        >
                            Remove from Favourites
                        </Button>
                    )}
                </VStack>
            </CardFooter>
        </Card>
    );
}
