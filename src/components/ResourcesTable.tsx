import { ArrowDownIcon, ArrowUpIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
    IconButton,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tooltip,
    Tr,
} from "@chakra-ui/react";
import { handleDislike, handleLike } from "../utils/likeHandlers";
import { Resource } from "../interface/Resource";
import { Usernames } from "../interface/Usernames";
import moment from "moment";
import { User } from "../interface/User";

interface ResourcesTableProps {
    resourcesSortedByDate: Resource[];
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
    usernames: Usernames;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
    activeUser: User;
}

export function ResourcesTable({
    resourcesSortedByDate,
    setSelectedResource,
    usernames,
    setResources,
    setFavourites,
    activeUser,
}: ResourcesTableProps): JSX.Element {
    return (
        <Table
            margin={"auto"}
            size={{ base: "sm", lg: "ms" }}
            width={{ base: "auto", lg: "80vw" }}
            variant={"striped"}
        >
            <Thead>
                <Tr textAlign={"center"}>
                    <Th textAlign={"center"}>Name</Th>
                    <Th textAlign={"center"}>Author</Th>
                    <Th textAlign={"center"}>Submitted By</Th>
                    <Th textAlign={"center"}>Reccomendation Type</Th>
                    <Th textAlign={"center"}>Link</Th>
                    <Th textAlign={"center"}>Likes</Th>
                    <Th textAlign={"center"}>Dislikes</Th>
                    <Th textAlign={"center"}>Date Added</Th>
                </Tr>
            </Thead>
            <Tbody>
                {resourcesSortedByDate.map((resource) => (
                    <Tr
                        textAlign={"left"}
                        key={resource.resource_id}
                        onClick={() => {
                            setSelectedResource(resource);
                        }}
                    >
                        <Td textAlign={"left"}>{resource.name}</Td>
                        <Td textAlign={"left"}>{resource.author}</Td>
                        <Td textAlign={"left"}>
                            {usernames[resource.user_id]}
                        </Td>
                        <Td textAlign={"left"} textTransform={"capitalize"}>
                            {resource.recommendation_type}
                        </Td>
                        <Td textAlign={"left"}>
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
                        <Td
                            justifyContent={"left"}
                            textAlign={"left"}
                            alignItems={"center"}
                        >
                            <IconButton
                                variant={"ghost"}
                                colorScheme="green"
                                aria-label="add-like"
                                icon={<ArrowUpIcon />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleLike(
                                        resource.resource_id,
                                        setResources,
                                        setFavourites,
                                        activeUser.user_id
                                    );
                                }}
                            />
                            {resource.likes}{" "}
                        </Td>
                        <Td
                            justifyContent={"left"}
                            textAlign={"left"}
                            alignItems={"center"}
                        >
                            <IconButton
                                variant={"ghost"}
                                colorScheme="red"
                                aria-label="add-like"
                                icon={<ArrowDownIcon />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDislike(
                                        resource.resource_id,
                                        setResources,
                                        setFavourites,
                                        activeUser.user_id
                                    );
                                }}
                            />
                            {resource.dislikes}
                        </Td>
                        <Td textAlign={"left"}>
                            {moment(resource.creation_date).format(
                                "DD/MM/yyyy"
                            )}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}
