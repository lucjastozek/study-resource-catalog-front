import {
    Avatar,
    Box,
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
}

export function ResourceCard({
    resource,
    setSelectedResource,
    usernames,
    linkPreviews,
    setResources,
}: ResourceCardProps): JSX.Element {
    return (
        <Card
            margin={"1vw"}
            key={resource.resource_id}
            width={"30vw"}
            height={"60vh"}
            onClick={() => {
                setSelectedResource(resource);
            }}
        >
            <CardHeader>
                <Flex
                    flex="1"
                    gap="4"
                    alignItems="center"
                    flexWrap="wrap"
                    marginBottom={"4vh"}
                >
                    <Avatar name={usernames[resource.user_id]} />

                    <Box>
                        <Heading size="sm">
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
                <Text fontWeight={"800"} textAlign={"center"}>
                    {resource.name}
                </Text>
            </CardHeader>
            <CardBody>
                <Text height={"14vh"} noOfLines={5}>
                    {resource.description}
                </Text>
            </CardBody>
            <CardFooter alignItems={"end"} justify={"center"}>
                <VStack>
                    <HStack>
                        <Tag
                            cursor={"pointer"}
                            onClick={() =>
                                handleLike(resource.resource_id, setResources)
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
                                    setResources
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
                </VStack>
            </CardFooter>
        </Card>
    );
}
