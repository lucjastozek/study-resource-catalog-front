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
    IconButton,
    Image,
    Skeleton,
    Table,
    Tag,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr,
    VStack,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";
import { Resource } from "../interface/Resource";
import { fetchImage } from "../utils/fetchImage";
import { fetchResources } from "../utils/fetchResources";
import { fetchUserName } from "../utils/fetchUserName";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface HomeProps {
    resources: Resource[];
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export const Home = ({ resources, setResources }: HomeProps): JSX.Element => {
    const [usernames, setUsernames] = useState<{ [key: number]: string }>({});
    const [linkPreviews, setLinkPreviews] = useState<{ [key: number]: string }>(
        {}
    );

    useEffect(() => {
        for (const r of resources) {
            fetchUserName(r.user_id).then((name) => {
                setUsernames((prev) => ({ ...prev, ...{ [r.user_id]: name } }));
            });

            fetchImage(r.url).then((img) => {
                setLinkPreviews((prev) => ({
                    ...prev,
                    ...{ [r.resource_id]: img },
                }));
            });
        }
    }, [resources]);

    const handleLike = async (id: number) => {
        await axios.put(`${baseUrl}/resources/${id}`, { action: "like" });
        fetchResources().then((res) => setResources(res));
    };

    const handleDislike = async (id: number) => {
        await axios.put(`${baseUrl}/resources/${id}`, { action: "dislike" });
        fetchResources().then((res) => setResources(res));
    };

    const tagScheme = {
        promising: "blue",
        recommend: "green",
        disrecommend: "red",
    };

    const copyLikesResources = [...resources];
    const resourcesSortedByLikes = copyLikesResources.sort(
        (a, b) => b.likes - a.likes
    );

    const copyDateResources = [...resources];
    const resourcesSortedByDate = copyDateResources.sort((a, b) =>
        moment(b.creation_date).diff(moment(a.creation_date))
    );

    return (
        <>
            <Flex
                flexWrap={"nowrap"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                overflowX={"auto"}
                width={"90vw"}
            >
                {resourcesSortedByLikes
                    .slice(0, 5)
                    .map((resource: Resource) => (
                        <Card
                            margin={"1vw"}
                            key={resource.resource_id}
                            width={"30vw"}
                            height={"60vh"}
                        >
                            <CardHeader>
                                <Flex
                                    flex="1"
                                    gap="4"
                                    alignItems="center"
                                    flexWrap="wrap"
                                    marginBottom={"4vh"}
                                >
                                    <Avatar
                                        name={usernames[resource.user_id]}
                                    />

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
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {resource.resource_id in linkPreviews ? (
                                        <Image
                                            src={
                                                linkPreviews[
                                                    resource.resource_id
                                                ]
                                            }
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
                                                handleLike(resource.resource_id)
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
                                                    resource.resource_id
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
                                        {moment(resource.creation_date).format(
                                            "DD/MM/yyyy"
                                        )}
                                    </Text>
                                </VStack>
                            </CardFooter>
                        </Card>
                    ))}
            </Flex>
            <Table width={"90vw"} variant={"striped"}>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Author</Th>
                        <Th>Reccomendation Type</Th>
                        <Th>Link</Th>
                        <Th>Likes</Th>
                        <Th>Dislikes</Th>
                        <Th>Date Added</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {resourcesSortedByDate.map((resource) => (
                        <Tr key={resource.resource_id}>
                            <Td>{resource.name}</Td>
                            <Td>{resource.author}</Td>
                            <Td textTransform={"capitalize"}>
                                {resource.recommendation_type}
                            </Td>
                            <Td>
                                <Tooltip label={resource.url}>
                                    <a href={resource.url} target="blank">
                                        <IconButton
                                            colorScheme="blue"
                                            aria-label="Search database"
                                            icon={<ExternalLinkIcon />}
                                        />
                                    </a>
                                </Tooltip>
                            </Td>
                            <Td>{resource.likes}</Td>
                            <Td>{resource.dislikes}</Td>
                            <Td>
                                {moment(resource.creation_date).format(
                                    "DD/MM/yyyy"
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
};
