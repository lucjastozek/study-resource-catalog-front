import {
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Link,
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
import { colorSchemes } from "../utils/colorSchemes";
import { TagI } from "../interface/Tag";
import { ExternalLinkIcon } from "@chakra-ui/icons";

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
    tags: TagI[];
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
    tags,
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
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                        <Avatar
                            name={username}
                            src={`./${username}-avatar.png`}
                        />

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
                    <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        marginBottom={"2vh"}
                        flexWrap={"wrap"}
                    >
                        {tags.map((tag, index) => (
                            <Badge
                                colorScheme={
                                    colorSchemes[index % colorSchemes.length]
                                }
                                key={index}
                                fontSize={{ base: "xs", lg: "sm" }}
                                size={{ base: "xs", lg: "sm" }}
                                margin={"0.5rem"}
                                variant={"solid"}
                                style={{
                                    paddingTop: "1vh",
                                    paddingBottom: "0.5vh",
                                    paddingLeft: "1.5vh",
                                    paddingRight: "1.5vh",
                                }}
                            >
                                {tag.name}
                            </Badge>
                        ))}
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

                    <Text
                        fontWeight={"800"}
                        textAlign={"center"}
                        marginTop={"2vh"}
                    >
                        {resource.name}
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb={2}>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Author:</span>{" "}
                            {resource.author}
                        </Text>
                    </Text>

                    <Text mb={2}>
                        <Text mb={1} fontWeight={"bold"}>
                            Description:{" "}
                        </Text>
                        {resource.description}
                    </Text>
                    <Text mb={2}>
                        <Text mb={1} fontWeight={"bold"}>
                            Reason:{" "}
                        </Text>
                        {resource.reason}
                    </Text>
                    <Text mb={2}>
                        <span style={{ fontWeight: "bold" }}>
                            Content type:
                        </span>{" "}
                        {formatContentType(resource.content_type)}{" "}
                        <span
                            style={{ fontWeight: "bold", marginLeft: "40px" }}
                        >
                            Stage:
                        </span>{" "}
                        Build week {resource.stage}
                    </Text>

                    <Text mb={2} fontWeight={"bold"}>
                        Link:{" "}
                        <Link isExternal color="teal.400" href={resource.url}>
                            {resource.name} <ExternalLinkIcon mx="2px" />
                        </Link>{" "}
                    </Text>
                    <Text mb={1}>
                        <span style={{ fontWeight: "bold" }}>
                            Creation Date:
                        </span>{" "}
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
