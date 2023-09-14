import {
    Avatar,
    Box,
    Flex,
    Heading,
    Text,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Table,
    Tbody,
    Tr,
    Td,
    Thead,
    Th,
} from "@chakra-ui/react";
import { Resource } from "../interface/Resource";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { useEffect, useState } from "react";
interface Top5Props {
    resources: Resource[];
}

export const TopFiveResources = ({ resources }: Top5Props): JSX.Element => {
    async function fetchUserName(id: number) {
        const response = await axios.get(baseUrl + `/users/${id}`);

        return response.data[0].name;
    }

    const [usernames, setUsernames] = useState<{ [key: number]: string }>({});
    const [linkPreviews, setLinkPreviews] = useState<{ [key: number]: string }>(
        {}
    );

    async function fetchImage(url: string) {
        const response = await axios.get(
            `https://api.linkpreview.net/?key=1c6f4ce9a60e382f3f06cb9a6460653e&q=${url}`
        );

        return response.data.image;
    }
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
                                <img
                                    src={linkPreviews[resource.resource_id]}
                                    alt=""
                                />
                            </a>
                            <Text fontWeight={"800"} textAlign={"center"}>
                                {resource.name}
                            </Text>
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
