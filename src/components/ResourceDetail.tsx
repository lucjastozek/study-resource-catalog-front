import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Skeleton,
    Tag,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { Resource } from "../interface/Resource";
import { formatContentType } from "../utils/formatContentType";
import moment from "moment";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import { User } from "../interface/User";
import useCustomToast from "./useCustomToast";
import { fetchFavourites } from "../utils/fetchFavourites";
import { handleDeleteResource } from "../utils/deleteHandlers";

interface ResourceDetailProps {
    isOpen: boolean;
    resource: Resource;
    tagColor: string;
    imageLink: string | null;
    username: string;
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    activeUser: User;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export function ResourceDetail({
    isOpen,
    resource,
    tagColor,
    imageLink,
    username,
    setSelectedResource,
    setResources,
    activeUser,
    setFavourites,
}: ResourceDetailProps): JSX.Element {
    const { onClose } = useDisclosure();
    const toast = useCustomToast();

    async function handleAddFavourite(resource_id: number, user_id: number) {
        await axios.post(baseUrl + "/favourites", {
            resource_id: resource_id,
            user_id: user_id,
        });

        toast("success", "Added to favourites!");

        fetchFavourites(activeUser.user_id).then((fav) => setFavourites(fav));
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
                setSelectedResource(undefined);
            }}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                        marginBottom={"4vh"}
                    >
                        <Avatar name={username} />

                        <Box>
                            <Heading size="sm">{username}</Heading>
                            <Tag
                                colorScheme={tagColor}
                                textTransform={"capitalize"}
                            >
                                {resource.recommendation_type}
                            </Tag>
                        </Box>
                    </Flex>
                    <a href={resource.url} target="_blank" rel="noreferrer">
                        {imageLink ? (
                            <Image
                                src={imageLink}
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
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        <Text fontWeight={"bold"}>Author: </Text>
                        {resource.author}
                    </Text>
                    <Text>
                        <Text fontWeight={"bold"}>Description: </Text>
                        {resource.description}
                    </Text>
                    <Text>
                        <Text fontWeight={"bold"}>Reason: </Text>
                        {resource.reason}
                    </Text>
                    <Text>
                        <Text fontWeight={"bold"}>Content type: </Text>
                        {formatContentType(resource.content_type)}
                    </Text>
                    <Text>
                        <Text fontWeight={"bold"}>Stage: </Text>
                        Build week {resource.stage}
                    </Text>
                    <Text>
                        <Text fontWeight={"bold"}>Link: </Text>
                        <a href={resource.url}>{resource.url}</a>
                    </Text>
                    <Text>
                        <Text fontWeight={"bold"}>Creation Date: </Text>
                        {moment(resource.creation_date).format("DD/MM/YYYY")}
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => {
                            onClose();
                            setSelectedResource(undefined);
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            handleAddFavourite(
                                resource.resource_id,
                                activeUser.user_id
                            );
                        }}
                    >
                        Add To Favourites!
                    </Button>
                    {activeUser.user_id === resource.user_id && (
                        <Button
                            colorScheme="red"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteResource(
                                    resource.resource_id,
                                    setResources
                                );
                            }}
                            size={"sm"}
                            marginLeft={"auto"}
                        >
                            Delete
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
