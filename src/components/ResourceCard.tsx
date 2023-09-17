import {
    Avatar,
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
}

export function ResourceCard({
    resource,
    setSelectedResource,
    usernames,
    linkPreviews,
    setResources,
    setFavourites,
    activeUser,
}: ResourceCardProps): JSX.Element {
    const location = useLocation();

    return (
        <Card key={resource.resource_id}>
            <CardHeader
                onClick={() => {
                    setSelectedResource(resource);
                }}
            >
                <Flex
                    flex="1"
                    gap="4"
                    alignItems="center"
                    flexWrap="wrap"
                    marginBottom={"2vh"}
                >
                    <Avatar name={usernames[resource.user_id]} />

                    <Box>
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
