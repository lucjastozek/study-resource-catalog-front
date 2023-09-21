import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Badge,
    Box,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Heading,
    IconButton,
    Image,
    ModalHeader,
    Skeleton,
    Tag,
} from "@chakra-ui/react";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { colorScheme } from "../utils/colorSchemes";

interface ResourceModalHeaderProps {
    username: string;
    tagColor: string;
    resource: Resource;
    tags: TagI[];
    imageLink: string | null;
    activeUser: User;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    editMode: boolean;
    handleChangeForm: (propertyTarget: string, value: string | number) => void;
    handleSubmit: () => void;
    handleDiscardEditing: () => void;
    editValues: Resource;
}

export function ResourceModalHeader({
    username,
    tagColor,
    resource,
    tags,
    imageLink,
    activeUser,
    setEditMode,
    editMode,
    handleChangeForm,
    handleSubmit,
    handleDiscardEditing,
    editValues,
}: ResourceModalHeaderProps): JSX.Element {
    return (
        <ModalHeader>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={username} src={`./${username}-avatar.png`} />

                <Box>
                    <Heading size="sm">{username}</Heading>
                    <Tag colorScheme={tagColor} textTransform={"capitalize"}>
                        {resource.recommendation_type}
                    </Tag>
                </Box>
                {activeUser.name === username && (
                    <>
                        <IconButton
                            onClick={() => {
                                if (editMode) {
                                    handleSubmit();
                                }
                                setEditMode((prev) => !prev);
                            }}
                            ml={"auto"}
                            mr={editMode ? "0.1vw" : "2vw"}
                            aria-label="Edit Button"
                            icon={editMode ? <CheckIcon /> : <EditIcon />}
                            colorScheme={editMode ? "green" : "blue"}
                        ></IconButton>

                        {editMode && (
                            <IconButton
                                onClick={handleDiscardEditing}
                                aria-label="discard edits"
                                mr={"2vw"}
                                colorScheme="red"
                                icon={<CloseIcon />}
                            ></IconButton>
                        )}
                    </>
                )}
            </Flex>
            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                marginBottom={"2vh"}
                marginTop={"2vh"}
                flexWrap={"wrap"}
            >
                {tags.map((tag, index) => (
                    <Badge
                        colorScheme={
                            colorScheme[tag.name as keyof typeof colorScheme]
                        }
                        key={index}
                        fontSize={{ base: "xs", lg: "sm" }}
                        size={{ base: "xs", lg: "sm" }}
                        margin={{ base: "0.25rem", lg: "0.5rem" }}
                        variant={"solid"}
                        paddingTop={{ base: "0.5vh", lg: "0.75vh" }}
                        paddingBottom={{ base: "0.5vh", lg: "0.75vh" }}
                        paddingInline={{ base: "1vh", lg: "1.5vh" }}
                        borderRadius={"9"}
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

            <Editable
                value={editValues.name}
                onChange={(e) => handleChangeForm("name", e)}
                isDisabled={!editMode}
                outline={editMode ? "solid 1px #4299E1" : "none"}
                borderRadius={editMode ? "5px" : "none"}
                paddingInline={2}
                id="name"
                fontWeight={"800"}
                textAlign={"center"}
                marginTop={"2vh"}
            >
                <EditablePreview />
                <EditableInput />
            </Editable>
        </ModalHeader>
    );
}
