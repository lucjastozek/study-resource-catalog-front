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
} from "@chakra-ui/react";
import { Resource } from "../interface/Resource";
import { formatContentType } from "../utils/formatContentType";
import moment from "moment";

interface ResourceDetailProps {
    isOpen: boolean;
    onClose: () => void;
    resource: Resource;
    tagColor: string;
    imageLink: string | null;
    username: string;
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
}

export function ResourceDetail({
    isOpen,
    onClose,
    resource,
    tagColor,
    imageLink,
    username,
    setSelectedResource,
}: ResourceDetailProps): JSX.Element {
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
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost">Add To Favourites!</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
