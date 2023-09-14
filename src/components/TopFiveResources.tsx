import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Skeleton,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";
import { Resource } from "../interface/Resource";

interface Top5Props {
    resources: Resource[];
}

export const TopFiveResources = ({ resources }: Top5Props): JSX.Element => {
    const [usernames, setUsernames] = useState<{ [key: number]: string }>({});
    const [linkPreviews, setLinkPreviews] = useState<{ [key: number]: string }>(
        {}
    );

    async function fetchUserName(id: number) {
        const response = await axios.get(baseUrl + `/users/${id}`);

        return response.data[0].name;
    }

    async function fetchImage(url: string) {
        const response = await axios.post(
            "https://get-link-thumbnail.onrender.com/image",
            { link: url }
        );

        return (
            response.data ??
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.supermemo.com%2Fen%2Fblog%2Ftwenty-rules-of-formulating-knowledge&psig=AOvVaw3L2h21d9H1-WV3SoHw1Vgp&ust=1694811094875000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNj45b39qoEDFQAAAAAdAAAAABAD"
        );
    }

    useEffect(() => {
        for (const r of resources) {
            fetchUserName(r.user_id).then((name) => {
                setUsernames((prev) => ({ ...prev, ...{ [r.user_id]: name } }));
            });
        }

        for (const r of resources.slice(0, 5)) {
            fetchImage(r.url).then((img) => {
                if (img !== "no image found") {
                    setLinkPreviews((prev) => ({
                        ...prev,
                        ...{ [r.resource_id]: img },
                    }));
                }
            });
        }
    }, [resources]);

    return (
        <>
            <Flex
                flexWrap={"nowrap"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                overflowX={"auto"}
                width={"90vw"}
            >
                {resources.slice(0, 5).map((resource: Resource) => (
                    <Card
                        margin={"1vw"}
                        key={resource.resource_id}
                        width={"30vw"}
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
                                    <Text textTransform={"capitalize"}>
                                        {resource.recommendation_type}
                                    </Text>
                                </Box>
                            </Flex>
                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {resource.resource_id in linkPreviews ? (
                                    <img
                                        src={linkPreviews[resource.resource_id]}
                                        alt=""
                                    />
                                ) : (
                                    <Skeleton height={"7rem"}></Skeleton>
                                )}{" "}
                            </a>

                            <Text>{resource.name}</Text>
                        </CardHeader>
                        <CardBody>
                            <Text>{resource.description}</Text>
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                ))}
            </Flex>
            <Table variant={"striped"}>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Author</Th>
                        <Th>Reccomendation type</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {resources.slice(5).map((resource) => (
                        <Tr key={resource.resource_id}>
                            <Td>{resource.name}</Td>
                            <Td>{resource.author}</Td>
                            <Td>{resource.recommendation_type}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
};
