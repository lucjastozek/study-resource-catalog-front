import { ExternalLinkIcon, StarIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Editable,
    EditableInput,
    EditablePreview,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import moment from "moment";
import { useState } from "react";
import { baseUrl } from "../baseUrl";
import { Comment } from "../interface/Comment";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { handleDeleteResource } from "../utils/deleteHandlers";
import { fetchFavourites } from "../utils/fetchFavourites";
import { fetchResources } from "../utils/fetchResources";
import { formatContentType } from "../utils/formatContentType";
import { CommentSection } from "./CommentSection";
import { ResourceModalHeader } from "./ResourceModalHeader";
import useCustomToast from "./useCustomToast";

interface ResourceDetailProps {
    isOpen: boolean;
    resource: Resource;
    tagColor: string;
    imageLink: string | null;
    username: string;
    activeUser: User;
    tags: TagI[];
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export function ResourceDetail({
    isOpen,
    resource,
    tagColor,
    imageLink,
    username,
    tags,
    activeUser,
    comments,
    setComments,
    setSelectedResource,
    setResources,
    setFavourites,
}: ResourceDetailProps): JSX.Element {
    const { onClose } = useDisclosure();
    const toast = useCustomToast();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editValues, setEditValues] = useState<Resource>({ ...resource });

    async function handleAddFavourite(resource_id: number, user_id: number) {
        await axios.post(baseUrl + "/favourites", {
            resource_id: resource_id,
            user_id: user_id,
        });
        toast("success", "Added to favourites!");
        fetchFavourites(activeUser.user_id).then((fav) => setFavourites(fav));
    }

    function handleChangeForm(propertyTarget: string, value: string | number) {
        const updatedProperty = { [propertyTarget]: value };
        setEditValues((prev) => ({ ...prev, ...updatedProperty }));
    }

    function handleDiscardEditing() {
        setEditValues({ ...resource });
        setEditMode(false);
    }

    async function handleSubmit() {
        try {
            await axios.put(
                baseUrl + "/resources/" + editValues.resource_id,
                editValues
            );

            fetchResources().then((res) => setResources(res));
            toast("success", `Resource ${resource.name} updated!`);
        } catch (error) {
            if (error instanceof AxiosError && error.response !== undefined) {
                toast("error", error.response.data.error);
            }
        }
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
                <ModalCloseButton />
                <ResourceModalHeader
                    username={username}
                    tagColor={tagColor}
                    resource={resource}
                    tags={tags}
                    imageLink={imageLink}
                    activeUser={activeUser}
                    setEditMode={setEditMode}
                    editMode={editMode}
                    handleChangeForm={handleChangeForm}
                    handleSubmit={handleSubmit}
                    handleDiscardEditing={handleDiscardEditing}
                    editValues={editValues}
                />
                <ModalBody>
                    <Text as={"b"}>Author:</Text>

                    <Editable
                        value={editValues.author}
                        onChange={(e) => handleChangeForm("author", e)}
                        isDisabled={!editMode}
                        outline={editMode ? "solid 1px #4299E1" : "none"}
                        borderRadius={editMode ? "5px" : "none"}
                        paddingInline={2}
                    >
                        <EditablePreview />
                        <EditableInput />
                    </Editable>

                    <Text as={"b"}>Description:</Text>

                    <Editable
                        value={editValues.description}
                        onChange={(e) => handleChangeForm("description", e)}
                        isDisabled={!editMode}
                        outline={editMode ? "solid 1px #4299E1" : "none"}
                        borderRadius={editMode ? "5px" : "none"}
                        paddingInline={1}
                    >
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                    <Text as={"b"}>Reason:</Text>
                    <Editable
                        value={editValues.reason}
                        onChange={(e) => handleChangeForm("reason", e)}
                        isDisabled={!editMode}
                        outline={editMode ? "solid 1px #4299E1" : "none"}
                        borderRadius={editMode ? "5px" : "none"}
                        paddingInline={2}
                    >
                        <EditablePreview />
                        <EditableInput />
                    </Editable>

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

                <ModalFooter justifyContent={"center"}>
                    <VStack>
                        <Box>
                            <Button
                                mr={3}
                                onClick={() => {
                                    handleAddFavourite(
                                        resource.resource_id,
                                        activeUser.user_id
                                    );
                                }}
                            >
                                <StarIcon
                                    style={{
                                        marginRight: "5px",
                                        verticalAlign: "middle",
                                        marginTop: "-5px",
                                    }}
                                />{" "}
                                Add To Favourites!
                            </Button>
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
                            {activeUser.user_id === resource.user_id && (
                                <Button
                                    colorScheme="red"
                                    onClick={(e) => {
                                        onClose();
                                        handleDeleteResource(
                                            resource.resource_id,
                                            setResources
                                        );
                                        e.stopPropagation();
                                        setSelectedResource(undefined);
                                    }}
                                    marginLeft={"auto"}
                                >
                                    Delete
                                </Button>
                            )}
                        </Box>
                        <CommentSection
                            resource={resource}
                            comments={comments}
                            activeUser={activeUser}
                            setComments={setComments}
                        />
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
