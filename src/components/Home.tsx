import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Badge,
    Center,
    Flex,
    Grid,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tooltip,
    Tr,
    useColorMode,
    useMediaQuery,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { colorSchemes } from "../utils/colorSchemes";
import { filterContent } from "../utils/filterContent";
import { tagScheme } from "../utils/tagScheme";
import { tags } from "../utils/tags";
import { ResourceCard } from "./ResourceCard";
import { ResourceDetail } from "./ResourceDetail";

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
    resourceTags: TagI[];
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
    resourceTags,
}: HomeProps): JSX.Element => {
    const [searchInput, setSearchInput] = useState<string>("");
    const filteredContent = filterContent(resources, usernames, searchInput);
    const { colorMode } = useColorMode();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const placeholderColor = colorMode === "dark" ? "white" : "black";

    const copyLikesResources = [...filteredContent];
    const resourcesSortedByLikes = copyLikesResources
        .sort((a, b) => b.likes - a.likes)
        .filter((resource) =>
            selectedTags.length > 0
                ? resourceTags
                      .filter((r) => r.resource_id === resource.resource_id)
                      .every((r) => selectedTags.includes(r.name))
                : true
        );

    const copyDateResources = [...filteredContent];
    const resourcesSortedByDate = copyDateResources
        .sort((a, b) => moment(b.creation_date).diff(moment(a.creation_date)))
        .filter((resource) =>
            selectedTags.length > 0
                ? resourceTags
                      .filter((r) => r.resource_id === resource.resource_id)
                      .every((r) => selectedTags.includes(r.name))
                : true
        );

    const handleSelectTags = (tag: string) => {
        if (selectedTags.includes(tag)) {
            const newTags = selectedTags.filter((t) => t !== tag);
            setSelectedTags(newTags);
        } else {
            setSelectedTags((prev) => [...prev, tag]);
        }
    };

    const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

    const slicedArray = isLargerThan800
        ? resourcesSortedByLikes.slice(0, 5)
        : resourcesSortedByDate;

    return (
        <>
            <Center marginInline={"auto"}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        style={{ transform: "translateY(11px)" }}
                    >
                        <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                        mt={3}
                        onChange={(e) => setSearchInput(e.target.value)}
                        width={{ base: "100%", lg: "20vw" }}
                        value={searchInput}
                        placeholder="Find resources..."
                        _placeholder={{ color: placeholderColor }}
                    ></Input>
                </InputGroup>
            </Center>
            <Flex
                justifyContent={"center"}
                flexWrap={{ base: "wrap", lg: "nowrap" }}
            >
                {tags.map((tag, index) => (
                    <Badge
                        colorScheme={colorSchemes[index % colorSchemes.length]}
                        key={index}
                        fontSize={"md"}
                        margin={"0.5rem"}
                        variant={
                            selectedTags.includes(tag) ? "solid" : "outline"
                        }
                        borderRadius={"5"}
                        textAlign={"center"}
                        padding={"0.5vh"}
                        onClick={() => handleSelectTags(tag)}
                    >
                        {tag}
                    </Badge>
                ))}
                <Badge
                    fontSize={"md"}
                    margin={"0.5rem"}
                    padding={"0.5vh"}
                    borderRadius={"5"}
                    onClick={() => setSelectedTags([])}
                >
                    Clear Tags
                </Badge>
            </Flex>

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
                    setResources={setResources}
                    activeUser={activeUser}
                    setFavourites={setFavourites}
                    tags={resourceTags.filter(
                        (tag) =>
                            tag.resource_id === selectedResource.resource_id
                    )}
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
                {slicedArray.map((resource: Resource) => (
                    <ResourceCard
                        key={resource.resource_id}
                        resource={resource}
                        setSelectedResource={setSelectedResource}
                        usernames={usernames}
                        linkPreviews={linkPreviews}
                        setResources={setResources}
                        setFavourites={setFavourites}
                        activeUser={activeUser}
                        tags={resourceTags.filter(
                            (tag) => tag.resource_id === resource.resource_id
                        )}
                    />
                ))}
            </Grid>

            {isLargerThan800 && (
                <Table
                    margin={"auto"}
                    size={{ base: "sm", lg: "md" }}
                    width={{ base: "auto", lg: "90vw" }}
                    variant={"striped"}
                >
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
            )}
        </>
    );
};
