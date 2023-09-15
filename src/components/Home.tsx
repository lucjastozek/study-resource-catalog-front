import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Grid,
    IconButton,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tooltip,
    Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { Resource } from "../interface/Resource";
import { ResourceCard } from "./ResourceCard";
import { ResourceDetail } from "./ResourceDetail";
import { tagScheme } from "../utils/tagScheme";
import { User } from "../interface/User";

interface HomeProps {
    resources: Resource[];
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    selectedResource: Resource | undefined;
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
    usernames: {
        [key: number]: string;
    };
    linkPreviews: {
        [key: number]: string;
    };
    activeUser: User;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export const Home = ({
    resources,
    setResources,
    selectedResource,
    setSelectedResource,
    usernames,
    linkPreviews,
    activeUser,
    setFavourites,
}: HomeProps): JSX.Element => {
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
            {selectedResource !== undefined ? (
                <ResourceDetail
                    isOpen={true}
                    resource={selectedResource}
                    tagColor={
                        tagScheme[
                            selectedResource.recommendation_type as keyof typeof tagScheme
                        ]
                    }
                    imageLink={linkPreviews[selectedResource.resource_id]}
                    username={usernames[selectedResource.user_id]}
                    setSelectedResource={setSelectedResource}
                    activeUser={activeUser}
                    setFavourites={setFavourites}
                />
            ) : (
                <></>
            )}
            <Grid
                templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }}
                templateRows={{ base: "repeat(5, 1fr)", md: "1fr" }}
                gap={4}
                margin={4}
            >
                {resourcesSortedByLikes
                    .slice(0, 5)
                    .map((resource: Resource) => (
                        <ResourceCard
                            key={resource.resource_id}
                            resource={resource}
                            setSelectedResource={setSelectedResource}
                            usernames={usernames}
                            linkPreviews={linkPreviews}
                            setResources={setResources}
                            setFavourites={setFavourites}
                            activeUser={activeUser}
                        />
                    ))}
            </Grid>
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
                        <Tr
                            key={resource.resource_id}
                            onClick={() => {
                                setSelectedResource(resource);
                            }}
                        >
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
