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
import { useLocation } from "react-router-dom";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { colorScheme } from "../utils/colorSchemes";
import { handleDeleteFavourites } from "../utils/deleteHandlers";
import { handleDislike, handleLike } from "../utils/likeHandlers";
import { tagScheme } from "../utils/tagScheme";

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
    const imageURL =
        linkPreviews[resource.resource_id] === "no image found"
            ? `https://fallback-image-api.onrender.com/?text=${resource.name}`
            : linkPreviews[resource.resource_id];

    return (
        <Card key={resource.resource_id}>
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
                        tags.slice(0, 3).map((tag, index) => (
                            <Badge
                                colorScheme={
                                    colorScheme[
                                        tag.name as keyof typeof colorScheme
                                    ]
                                }
                                key={index}
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
            <CardBody
                marginLeft={2}
                marginRight={2}
                onClick={() => {
                    setSelectedResource(resource);
                }}
            >
                <Text noOfLines={4}>{resource.description}</Text>
            </CardBody>
            <CardFooter
                pb={"0"}
                pr={"0"}
                pl={0}
                alignItems={"end"}
                justify={"center"}
            >
                <VStack w={"100vw"}>
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
                            {resource.likes} Likes 👍
                        </Tag>{" "}
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
                            {resource.dislikes} Dislikes 👎
                        </Tag>{" "}
                    </HStack>

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

                    <Text
                        mb={"0.3rem"}
                        mt={"1rem"}
                        ml={"auto"}
                        pr={"1rem"}
                        as={"i"}
                    >
                        Submitted{" "}
                        {moment().diff(
                            moment(resource.creation_date),
                            "days"
                        ) === 0
                            ? `${moment().diff(
                                  moment(resource.creation_date),
                                  "hours"
                              )} hours ago`
                            : `${moment().diff(
                                  moment(resource.creation_date),
                                  "days"
                              )} days ago`}
                    </Text>
                </VStack>
            </CardFooter>
        </Card>
    );
}
